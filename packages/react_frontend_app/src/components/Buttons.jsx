// import "../styles/Buttons.css";
import { ButtonComponent } from "./ButtonComponent";
import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";

export function Buttons() {
  const { isCoding } = useContext(QuestionContext);
  return (
    <div className="flex mx-2 py-2 px-5 items-center justify-between border border-solid border-black ">
      <div className="flex gap-5">
        <ButtonComponent buttonName="Question" />
        <ButtonComponent buttonName="Solution" />
      </div>
      <div className="ml-5 w-max">
        <ButtonComponent buttonName={isCoding ? "<------ DRAW-BOARD" : "CODE-SPACE ------>"} buttonSpecial="code-space" />
        {/* <div>CODE-SPACE ------&gt;</div> */}
      </div>
    </div>
  )
}
