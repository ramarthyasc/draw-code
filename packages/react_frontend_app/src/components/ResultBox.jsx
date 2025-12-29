import { forwardRef } from "react";

export function stringify(input) {
    if (typeof input === "boolean" ||
        typeof input === "number" ||
        typeof input === "undefined" ||
        Object.prototype.toString.call(input) === "[object Null]"
    ) {
        return `${input}`;
    } else if (
        typeof input === "string"
    ) {
        return `"${input}"`;
    } else if (
        Object.prototype.toString.call(input) === "[object Array]" ||
        Object.prototype.toString.call(input) === "[object Object]"
    ) {
        // json.stringify removes functions and undefined inside the array or object
        return JSON.stringify(input);
    }
}

export const ResultBox = forwardRef((props, resultBoxRef) => {
    console.log(props.result)

    if (props.result === "") {
        return (
            <div ref={resultBoxRef} className="h-81 text-left overflow-auto">
            default
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
                                            console.log(i);
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
                                                    <div> {stringify(item.input)} </div>
                                                    <div> My Output: </div>
                                                    <div> {stringify(item.userOutput)} </div>
                                                    <div> Expected Output: </div>
                                                    <div> {stringify(item.expOutput)} </div>
                                                </div>
                                            )
                                        } else {
                                            const userlog = result[i-1];
                                            return (
                                                <div key={i-1}>
                                                    <div className="border border-solid rounded-md border-gray-700 bg-gray-200 text-gray-800" >
                                                        Log {i-1}:
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
