import { useContext, useEffect, useState } from "react"
import { QuestionContext } from "../context/QuestionContext"
import { CaseButton } from "./CaseButton";

interface IExample {
    id: number;
    title: string;
    input: string;
    output: string;
    explanation: string;

}
interface ITips {
    title: string;
    description: string;
}
interface IQuestionDetails {
    id: number;
    name: string;
    title: string;
    difficulty: string;
    examples: IExample[];
    constraints: string[];
    tips: ITips[];

}
export interface IQuestionContext {
    questionDetails: IQuestionDetails;
    isCoding: boolean;
    setIsCoding: boolean;
}

function inputSanitize(input: IExample["input"]) {
    return input.replace(/.*=\s?/, "")
}

export function QuestionCases() {

    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error("QuestionContext must be used")
    }
    const { questionDetails } = context;
    const [ mouseDown, setMouseDown] = useState(false)
    const [ isActive, setIsActive] = useState(false)

    function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
        setMouseDown(true);
    }
    function handleMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
        if (mouseDown) {
            setIsActive(true);
        }
        setMouseDown(false);
    }

    useEffect(() => {
        document.addEventListener("mouseup", () => {
            setMouseDown(false);
        });
    }, [])

    if (questionDetails.examples.length === 1) {
        return (
            <div>
                <button type="button" className="border border-solid px-2 py-0.5 mx-1 my-1">Case 1</button>
                <div> Input: </div>
                <div> {inputSanitize(questionDetails.examples[0].input)} </div>
                <div> Output: </div>
                <div> {questionDetails.examples[0].output} </div>
            </div>
        )
    } else {
        return (
            <div>
                <CaseButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}  case="Case 1" />
                <CaseButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} case="Case 2" />

                <div> Input: </div>
                <div> {inputSanitize(questionDetails.examples[0].input)} </div>
                <div> Output: </div>
                <div> {questionDetails.examples[0].output} </div>
            </div>
        )
    }
}
