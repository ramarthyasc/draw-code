import '../styles/Userin.css';
import { ErrorContext } from "../context/ErrorContext";
import { useContext } from "react";


async function signout({ setIsLoggedIn, setJsonWebToken, setUser, setRtError }) {
    setIsLoggedIn(false);
    setJsonWebToken(null);
    setUser(null);
    setRtError(true);

    try {
        //Revoke refresh token
        const res = await fetch('/refresh-auth', {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ revokeRefreshToken: true }),
        })

        console.log("HTTP response error: ", res.status);

        if (res.ok) {
            console.log("Error. Server shouldn't send 'ok' response when logging out");
            return;
        } else if (res.status === 401) {
            const { code } = await res.json();
            console.log(code);
            return;

        } else if (res.status === 500) {
            // Error handler default server Error
            const defaultServerError = await res.text();
            console.log("HTTP response error: ", res.status);
            console.log(defaultServerError);
            return;
        } else {
            //unknown server send error (someone changed the status from server)
            console.log("HTTP response error: ", res.status);
        }

    } catch (err) {
        console.log("Network(Fetch) error or Parsing (text/json) error: ", err);
        return;
    }

}


function Userin({ setIsLoggedIn, setJsonWebToken, setUser, user }) {

    const setRtError = useContext(ErrorContext);

    return (

        <>
            <ul className='user'>
                <li className='dropdown'>
                    {/* profile pic is served this way from server as static file */}
                    <img src={'/proPic/' + user.picture} alt="pic" className='profile-pic' />
                    <ul className='profile-menu'>
                        <li onClick={() => { signout({ setIsLoggedIn, setJsonWebToken, setUser, setRtError }) }}>Signout</li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

export default Userin;
export { signout };
