import { forwardRef, useRef, useEffect } from "react";
import { QuestionCases } from "./QuestionCases";
import { Result } from "./Result";
import { ActiveOrNotButton } from "./utilityComponents/ActiveOrNotButton";
import { useIsButtonActive } from "./customhooks/useActiveOrNotButton";
import { useLocation } from "react-router-dom";


export const ResultBox = forwardRef((props, resultBoxRef) => {

    const { activeButtonId, setActiveButtonId, handleMouseDown, handleMouseUp } = useIsButtonActive("0");

    // to know if url change is causing the render (using Link)
    // or due to the state change inside the component itself.
    // location.key changes if url changes (route params or anything else) - any new history entry created
    const location = useLocation();
    const locationKeyRef = useRef(location.key);
    const isLocationChanged = locationKeyRef.current !== location.key;
    useEffect(() => {
        setActiveButtonId("0");
        locationKeyRef.current = location.key;
    }, [isLocationChanged]);


    if (props.result === "") {
        // default - show the cases - when Codespace component rendered initially
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                <QuestionCases />
            </div>
        )
    } else if (props.result === "signin") {
        // When i get refresh token error (ie' Not logged in), then did setData as "signin" in custom hook. 
        // Displays - signin to submit
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                <div> Signin to submit your answer </div>
                <QuestionCases />
            </div>
        )

    } else if (props.result === "Coming soon ...") {
        // Coming soon ... is the input from GNU C COMPILER
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                <div> C language coming soon...</div>
                <QuestionCases />
            </div>
        )
    } else if (typeof props.result === "string") {
        // if props.result is string, then it is Error stack trace
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                <div className="border border-solid rounded-md border-red-700 bg-red-200 text-red-900" >
                    Error:
                </div>
                <div>
                    {props.result ? props.result.split("<br>").map((str, i) => {
                        return <div key={i}>{str}</div>
                    }) : ""}
                </div>
            </div>
        )
    } else {
        console.log("HEYYYYYYYYYY")
        //If prop.result is an Array of Arrays, then it's the Case Result
        console.log(props.result);
        console.log(activeButtonId);


        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                {
                    props.result.some((result) => {
                        return result.at(-1).pass === false;
                    }) ?
                        <div className="text-red-900">
                            OOPS !! You Failed
                        </div> :
                        <div className="text-green-900">
                            YAY !! You Passed
                        </div>


                }
                <div >
                    {props.result.map((result, i) => {
                        //Can be many cases
                        return (
                            <ActiveOrNotButton key={i} interactionFuncs={{
                                onMouseDown: handleMouseDown,
                                onMouseUp: handleMouseUp
                            }}
                                buttonProps={{
                                    id: i,
                                    name: `Case ${i}`,
                                    isActive: activeButtonId === `${i}`,
                                    color: result.at(-1).pass ? "darkgreen" : "darkred"
                                }} />
                        )
                    })
                    }
                </div>
                < div >
                    <Result result={props.result[Number(activeButtonId)]} />
                </div>

            </div >
        )
    }

})
