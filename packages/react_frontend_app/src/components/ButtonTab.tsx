import { useContext} from "react";
import { QuestionContext } from "../context/QuestionContext";
import { useIsButtonActive } from "./customhooks/useIsButtonActive";
import type { IActiveOrNotButtonProps } from "./utilityComponents/ActiveOrNotButton";
import { ActiveOrNotButton } from "./utilityComponents/ActiveOrNotButton";
import { OneClickButton } from "./utilityComponents/OneClickButton";
import type { IOneClickButtonProps } from "./utilityComponents/OneClickButton";
import { useOneClickButton } from "./customhooks/useOneClickButton";

export function ButtonTab() {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error("Context shouldn't be null")
    }
    const { isCoding, setIsCoding } = context;
    const { handleMouseDown: oneClickHandleDown, handleMouseUp: oneClickHandleUp} = useOneClickButton(setIsCoding);
    //don't need this activeButtonId bcs, we are not having 2 or more ActiveOrNotButtons to switch the "isActive" state
    const { 
        activeButtonId, 
        handleMouseDown: activeOrNotHandleDown, 
        handleMouseUp: activeOrNotHandleUp 
    } = useIsButtonActive("");

    const questionProps: IActiveOrNotButtonProps = {
        id: "question",
        name: "Question",
        isActive: true,
        color: "gray",
    }

    const nextProps: IOneClickButtonProps = {
        id: "next",
        name: ">>",
        color: "gray",
    }

    const isCodingProps: IOneClickButtonProps = {
        id: "code-draw",
        name: isCoding ? "<------ DRAW-BOARD" : "CODE-SPACE ------>",
        color: "amber",

    }
    //


    return (
        <div className="flex mx-2 py-2 px-5 items-center justify-between border border-solid border-black ">
            <div className="flex gap-5">
                <ActiveOrNotButton interactionFuncs={{ onMouseDown: activeOrNotHandleUp, 
                    onMouseUp: activeOrNotHandleUp }}
                    buttonProps={questionProps} />

                <OneClickButton interactionFuncs={{onMouseDown: oneClickHandleDown, onMouseUp: oneClickHandleUp}} 
                buttonProps={nextProps} />
            </div>
            <div className="ml-5 w-max">
                <OneClickButton interactionFuncs={{onMouseDown: oneClickHandleDown, onMouseUp: oneClickHandleUp}} 
                buttonProps={isCodingProps} /> 

                {/* <div>CODE-SPACE ------&gt;</div> */}
            </div>
        </div>
    )
}
