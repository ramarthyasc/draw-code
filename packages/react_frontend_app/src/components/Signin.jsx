import { useEffect, useId } from 'react';
import '../styles/Signin.css';

function Signin({ setIsLoggedIn, setJsonWebToken, setUser }) {
    const navId = useId();

    async function handleCredentialResponse(response) {
        //console.log(response.credential);

        try {
            const loginRes = await fetch("/draw-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ credential: response.credential }),
            })

            if (loginRes.ok) {

                const { accessToken, userDetail } = await loginRes.json();

                // verify the jwt = optional
                const res = await fetch("/jwt-ui-auth", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                    credentials: "include",
                })

                const { code } = await res.json();
                
                if (res.ok) {

                    if (code === "VALID_JWT") {
                        setJsonWebToken(accessToken);
                        setIsLoggedIn(true);
                        setUser(userDetail);
                        return;
                    }

                } else {

                    if (code === "INVALID_OR_EXPIRED_JWT") {
                        console.log("Verification HTTP Error: ", res.status);
                        return; //end the function
                    }

                }

            } else {
                console.log("Login HTTP Error: ", loginRes.status);
                return; //end the function
            }


        } catch (err) {
            console.log("Fetch/Network error: ", err);
            return;
        }

    }



    // 'Mine' Effect
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            ux_mode: "popup",
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById(navId),
            {
                type: "icon",
                size: "small",
                shape: "circle",
                theme: "filled_blue",
            }

        )

    }, []);

    return (
        <>
            <div className='signin-block'>
                <ul className='signin'>
                    <li>Sign in</li>
                </ul>
                <div className='authorize'>
                    <div id={navId}></div>
                </div>
            </div>
        </>
    )



}


export default Signin;

