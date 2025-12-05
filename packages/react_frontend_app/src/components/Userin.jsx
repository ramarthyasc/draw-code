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
        const { code } = await res.json();

        if (code === "REFRESH_TOKEN_REVOKED" || code === "NO_REFRESH_TOKEN" || code === "INVALID_REFRESH_TOKEN") {
            console.log(code);
            return;
        }

    } catch (err) {
        console.log("Fetch/Network Error (Header/Metadata fetching or Body fetching): ", err);
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
