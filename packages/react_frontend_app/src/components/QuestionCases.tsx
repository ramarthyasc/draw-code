import { useContext } from "react"
import { QuestionContext } from "../context/QuestionContext"
import { ActiveOrNotButton } from "./utilityComponents/ActiveOrNotButton";
import { useIsButtonActive } from "./customhooks/useActiveOrNotButton";
import type { IActiveOrNotButtonProps } from "./utilityComponents/ActiveOrNotButton";
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
    const { activeButtonId, handleMouseDown, handleMouseUp } = useIsButtonActive("case0");

    const case0: IActiveOrNotButtonProps = {
        id: "case0",
        name: "Case 0",
        isActive: activeButtonId === "case0" ? true : false,
        color: "green",
    }
    const case1: IActiveOrNotButtonProps = {
        id: "case1",
        name: "Case 1",
        isActive: activeButtonId === "case1" ? true : false,
        color: "green",
    }

    const activeCaseNum = activeButtonId === "case0" ? 0 : 1;

    if (questionDetails.examples.length === 1) {
        return (
            <div>
                <ActiveOrNotButton interactionFuncs={{ onMouseDown: handleMouseDown, onMouseUp: handleMouseUp }}
                    buttonProps={case0} />
                <div> Input: </div>
                <div> {inputSanitize(questionDetails.examples[activeCaseNum].input)} </div>
                <div> Output: </div>
                <div> {questionDetails.examples[activeCaseNum].output} </div>
            </div>
        )
    } else {

        return (
            <div>
                <ActiveOrNotButton interactionFuncs={{ onMouseDown: handleMouseDown, onMouseUp: handleMouseUp }}
                    buttonProps={case0} />
                {/* when you put same component multiple times,then they are duplicated like that when you  */}
                {/* put many divs. So think of the component as many copies. Not same reference. */}
                <ActiveOrNotButton interactionFuncs={{ onMouseDown: handleMouseDown, onMouseUp: handleMouseUp }}
                    buttonProps={case1} />

                <div> Input: </div>
                <div> {inputSanitize(questionDetails.examples[activeCaseNum].input)} </div>
                <div> Output: </div>
                <div> {questionDetails.examples[activeCaseNum].output} </div>
            </div>
        )
    }
}
