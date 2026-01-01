import { forwardRef } from "react";
import { stringify } from "./helperFunctions/stringify";
import { QuestionCases } from "./QuestionCases";


export const ResultBox = forwardRef((props, resultBoxRef) => {

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
        //If prop.result is an Array of Arrays, then it's the Case Result
        console.log(props.result);
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
                {
                    props.result.map((result, index) => {
                        return (
                            <div key={index}>
                                <div className="border border-solid rounded-md border-green-800 bg-green-50 text-green-900" >
                                    Case {index}:
                                </div>
                                <div >
                                    {result.map((_, i) => {
                                        if (i === 0) {
                                            // reversing the mapping order
                                            const item = result[result.length - 1]
                                            return (
                                                <div key={i}>
                                                    <div> {item.pass ?
                                                        <div className="text-green-900">
                                                            YAY !! You Passed
                                                        </div>
                                                        : <div className="text-red-900">
                                                            OOPS !! You Failed
                                                        </div>}
                                                    </div>
                                                    <div> Input: </div>
                                                    <div> {item.input} </div>
                                                    <div> My Output: </div>
                                                    <div> {item.userOutput} </div>
                                                    <div> Expected Output: </div>
                                                    <div> {item.expOutput} </div>
                                                </div>
                                            )
                                        } else {
                                            const userlog = result[i - 1];
                                            return (
                                                <div key={i}>
                                                    <div className="border border-solid rounded-md border-gray-700 bg-gray-200 text-gray-800" >
                                                        Log {i - 1}:
                                                    </div>
                                                    <div>
                                                        {stringify(userlog)}
                                                    </div>

                                                </div>
                                            )
                                        }


                                    })}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

})
