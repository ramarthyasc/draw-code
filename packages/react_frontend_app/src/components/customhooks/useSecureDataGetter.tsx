import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
//
//
type UserDetail = {
    userid: string;
    name: string;
    email: string;
    picture: string;
}
interface IAuthState {
    jsonWebToken: string;
    setJsonWebToken: Dispatch<SetStateAction<string>>;
    setUser: Dispatch<SetStateAction<UserDetail>>;
}

interface IBody {
    [key: string]: FormDataEntryValue | string
}

// a “Custom hook” must call at least one Hook at its top level, otherwise it’s just a normal function.That's it
// Custom hook with side effects for jsonWebToken, user. Returned data ie; data
export function useSecureDataGetter() {

    const [data, setData] = useState("");

    const secureDataGetter = useCallback(async (authState: IAuthState, body?: FormData) => {
        try {
            let res: Response;
            if (body) {
                const bodyObject: IBody = Object.fromEntries(body.entries());
                res = await fetch("/api/draw-submit", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authState.jsonWebToken}`
                    },
                    body: JSON.stringify(bodyObject),
                })
            } else {
                res = await fetch("/api/draw-submit", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authState.jsonWebToken}`
                    }
                })
            }

            if (res.ok || res.status === 500) {
                // Server's draw-submit route is reached
                //
                // res.json is res.text + JSON.parse().
                // res.text is the promise in which it internally receives buffer streams from the server,
                // and then it concats it, parses to a string, then sends the resolve
                // ie; the concated string parsed version.

                const restext = await res.text();
                if (res.ok) {
                    // server judge service 
                    setData(restext);
                    return;
                } else {
                    // server judge container (docker compose error) error - got from default Error handler
                    throw new Error(restext);
                }

            } else if (res.status === 401) {
                // jwt is expired, so get the refresh token
                const { code } = await res.json();
                console.log(code)
                // now fetch the RT & JWT
                //
                const jwtFetch = await fetch("/api/refresh-auth/", {
                    method: "GET",
                    credentials: "include"
                })

                if (jwtFetch.ok) {
                    const { accessToken, userDetail } = await jwtFetch.json();
                    authState.setJsonWebToken(accessToken);
                    authState.setUser(userDetail);

                    // call the Function once more to do the function request again
                    try {
                        if (body) {
                            await secureDataGetter({
                                jsonWebToken: accessToken,
                                setJsonWebToken: authState.setJsonWebToken,
                                setUser: authState.setUser
                            }, body);
                        } else {
                            await secureDataGetter({
                                jsonWebToken: accessToken,
                                setJsonWebToken: authState.setJsonWebToken,
                                setUser: authState.setUser
                            });
                        }
                    } catch (err) {
                        console.log(err);
                        throw err;
                    }
                } else if (jwtFetch.status === 401) {
                    //RT is invalid
                    const { code } = await jwtFetch.json();
                    console.log(code);
                    throw new Error(JSON.stringify(code));
                } else if (jwtFetch.status === 500) {
                    //any server error
                    const defaultServerError = await jwtFetch.text();
                    console.log("HTTP error: ", jwtFetch.status);
                    console.log(defaultServerError);
                    throw new Error(defaultServerError);
                } else {
                    // unknown error from server (someone changed statuscode from serverside)
                    console.log("HTTP error: ", jwtFetch.status);
                    throw new Error(jwtFetch.status.toString());
                }

            } else {
                    // unknown error from server (someone changed statuscode from serverside)
                    console.log("HTTP error: ", res.status);
                    throw new Error(res.status.toString());
            }

        } catch (err) {
            console.log("Network(Fetch) error or Parsing (text/json) error: ", err);
            throw err;
        }

    }, []);

    // You can use this result ie; Data state for any Generic use in any component
    return { data, secureDataGetter };

}
