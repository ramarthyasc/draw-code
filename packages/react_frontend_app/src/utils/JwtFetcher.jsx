import { useEffect, useState, useRef } from 'react';
import { ErrorContext } from '../context/ErrorContext';


// Used for When you Start the App/ Refresh your page. That's it . That's the only use of this util.
// (If there is Valid refresh token, then generate new JWT from server. If no Valid RT, then don't give access)
//
function JwtFetcher({ children, jsonWebToken, isLoggedIn, setIsLoggedIn, setJsonWebToken, setUser }) {
    console.log("Jwtfetcher")

    const [rtError, setRtError] = useState(false);
    const isMountedRef = useRef(false);


    useEffect(() => {
        async function fetcher() {

            if (!jsonWebToken) {

                try {

                    const res = await fetch('/refresh-auth', {
                        method: "GET",
                        credentials: 'include',
                    })


                    if (res.ok) {

                        const { accessToken, userDetail } = await res.json();

                        setJsonWebToken(accessToken);
                        setIsLoggedIn(true);
                        setUser(userDetail);
                        setRtError(false);

                    } else {

                        console.log("HTTP response error: ", res.status);
                        const { code } = await res.json();

                        if (code === "NO_REFRESH_TOKEN" || code === "INVALID_REFRESH_TOKEN") {
                            setRtError(true);
                            return;
                        }
                    }

                } catch (err) {
                    console.log("Fetch/Network Error (Header/Metadata fetching or Body fetching): ", err);
                    return;

                }

            }

        }

        if (!isMountedRef.current) {
            fetcher();
        }
        isMountedRef.current = true;


    }, []);

    //NOTE: When we return Children or Outlet - then they are renders. So only after all the Consecutive renders are done, then only
    // the useEffects are run. This is BAD - if the useEffects has async functions in it. Because those useEffects run asynchronously.
    // Not in a linear manner. Which can play mischief when there are dependent states in those useEffects - thus making race conditions.
    // Eg: in the first useEffect if we had await which decides if the isLoggedIn is true or false. Then as it is await, it jumps to next useEffect
    // which decides another function based on the isLoggedIn.
    // So to PREVENT THIS, Whenever a COMPONENT return a children or outlet or any other <<<DYNAMIC RENDER>>>, then do block it using "...loading"
    // and then run the Component's useEffect in there itself. Then only, return the DYNAMIC RENDER. 
    // Here, in this pattern, we can use localvariables without useState - inside UseEffect where there is no state changers.
    //NOTE:  Even if the Dynamic Renders returned are the SAME, we have to make sure that, useEffects is run here itself, if that useEffects have await.
    // ie; The AWAITS SHOULD BE DONE right here AND WE SHOULD GET THE RESULTS HERE ITSELF. THEN ONLY, WE SHOULD RETURN THE DYNAMIC RENDER. 
    // For no errors down the ROAD.
    // THE THING IS THAT< ONLY AFTER GETTING RESULT FROM AWAIT (error or result), is when WE SHOULD return the DYNAMIC RENDER.

    // We set the if else logic of letting the user in or not - inside the Component itself (using isLoggedIn) - so that
    // I don't clutter this JwtFetcher component - which is for handling REFRESHES only- Good practice for me.

    //Runs this only if we refreshed the page 

    //Note here
    // When there is no jsonWebToken, then it is always noLogged in as they always go together.
    //NOTE: (Refresh page flow and Signout page flow)
    if (!isLoggedIn) {
        if (rtError === true) { return <>{children}</> } // Only return DYNAMIC RENDERS (render the Children) only after
        //we made sure that useEffects is run fully in here itself.
        return "...loading"; // block the flow to the children - so that useEffect runs here. (useEffects are prevented from compounding & running last
        // ie; after all children and things are rendered)
    }


    // Return children after we made sure that useEffects ran here itself. Here, it returns if isLoggedIn is true NOTE: (In Normal flow)
    return (

        <ErrorContext.Provider value={setRtError}>
            <>{children}</>
        </ErrorContext.Provider>
        //Render this first in Real DOM, then runs useEfects (only 1 time) - which schedule state change. Then reruns the component.
        // which gives the The main render we need. This all happens fast that you won't see the initial Children (typically, we use "loading.." text) page.
    )

}


export default JwtFetcher;
