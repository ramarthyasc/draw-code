import { useContext, useRef, useEffect } from "react"
import { QuestionContext } from "../context/QuestionContext"
import { ActiveOrNotButton } from "./utilityComponents/ActiveOrNotButton";
import { useIsButtonActive } from "./customhooks/useActiveOrNotButton";
import type { SetStateAction, Dispatch } from "react";
import type { QuestionName } from "./types/question";

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
    name: QuestionName;
    title: string;
    difficulty: string;
    examples: IExample[];
    constraints: string[];
    tips: ITips[];
}
interface IPrevNextQuestion {
    id: number;
    name: QuestionName;
    difficulty: string;
}
interface IQDetailsQNextPrev {
    questionDetails: IQuestionDetails;
    prevNextQuestionsArray: IPrevNextQuestion[];
}
export interface IQuestionContext {
    qDetailsQNextPrev: IQDetailsQNextPrev;
    isCoding: boolean;
    setIsCoding: Dispatch<SetStateAction<boolean>>;
}

function inputSanitize(input: IExample["input"]) {
    return input.replace(/.*=\s?/, "")
}

export function QuestionCases() {

    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error("QuestionContext must be used")
    }
    const { qDetailsQNextPrev } = context;
    const questionDetails = qDetailsQNextPrev.questionDetails;
    // to know if the render is happening due to the change in qDetailsQNextPrev (Parent supplied state) 
    // or due to the state change inside the component itself.
    const qDetailsQNextPrevRef = useRef(qDetailsQNextPrev);
    let isQDetailsQNextPrevChange: boolean = qDetailsQNextPrevRef.current !== qDetailsQNextPrev;


    const { activeButtonId, setActiveButtonId, handleMouseDown, handleMouseUp } = useIsButtonActive("0");

    useEffect(() => {
        setActiveButtonId("0");
        qDetailsQNextPrevRef.current = qDetailsQNextPrev;
    }, [isQDetailsQNextPrevChange]);


    return (
        <div>
            {questionDetails.examples.map((_, i) => {
                if (i > 1) { return; } //Types of cases (only 2 allowed)
                return (
                    <ActiveOrNotButton key={i} interactionFuncs={{ onMouseDown: handleMouseDown, onMouseUp: handleMouseUp }}
                        buttonProps={{ id: i, name: `Case ${i}`, isActive: activeButtonId === `${i}`, color: "green" }} />
                )
            })
            }

            <div> Input: </div>
            <div> {questionDetails.examples[Number(activeButtonId)] ?
                inputSanitize(questionDetails.examples[Number(activeButtonId)].input) :
                ""
            } </div>
            <div> Output: </div>
            <div> {questionDetails.examples[Number(activeButtonId)] ?
                inputSanitize(questionDetails.examples[Number(activeButtonId)].output) :
                ""
            } </div>
        </div>
    )
}
