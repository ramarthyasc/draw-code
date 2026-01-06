import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { IBody } from '../types/question';
//
//
export type UserDetail = {
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


// a “Custom hook” must call at least one Hook at its top level, otherwise it’s just a normal function.That's it
// Custom hook with side effects for jsonWebToken, user. Returned data ie; data
export function useSecureDataGetter() {

    const [data, setData] = useState("");

    const secureDataGetter = useCallback(async (authState: IAuthState, path: string,
        body?: FormData) => {
        try {
            let res: Response;
            if (body) {
                const bodyObject: IBody = Object.fromEntries(body.entries());
                res = await fetch(path, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authState.jsonWebToken}`
                    },
                    body: JSON.stringify(bodyObject),
                })
            } else {
                res = await fetch(path, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authState.jsonWebToken}`
                    }
                })
            }

            if (res.ok) {

                // server judge service 
                const resJson = await res.json();
                setData(resJson);
                return;

            } else if (res.status === 400 || res.status === 500) {

                const resText = await res.text();

                if (res.status === 400) {
                    // wrong answer submitted. Error got from inside the container
                    setData(resText);
                    return;
                } else {
                    // Server default error
                    throw new Error(resText);
                }

            } else if (res.status === 401) {
                // jwt is expired or none is there, so get the jwt & refresh token using the current RT
                const { code } = await res.json();
                console.log(code)
                // now fetch the RT & JWT
                //
                const jwtFetch = await fetch("/api/refresh-auth", {
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
                            }, path, body);
                        } else {
                            await secureDataGetter({
                                jsonWebToken: accessToken,
                                setJsonWebToken: authState.setJsonWebToken,
                                setUser: authState.setUser
                            }, path);
                        }
                    } catch (err) {
                        console.log(err);
                        throw err;
                    }
                } else if (jwtFetch.status === 401) {
                    //RT is invalid
                    const { code } = await jwtFetch.json();
                    console.log(code);
                    // Show in the ResultBox that You have to signin to submit (Instead of throwing Error)
                    setData("signin");
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

            } else if (res.status === 403) {
                /// ADMIN NON AUTHORIZATION - FORBIDDEN IF ROLE IS USER
                const { code } = await res.json();
                console.log(code);
                setData("signin"); // Say forbidden when we get "signin" as the setData
                return;

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
    return { data, setData, secureDataGetter };

}
