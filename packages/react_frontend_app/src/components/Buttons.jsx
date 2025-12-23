import "../styles/Buttons.css";
import { ButtonComponent } from "./ButtonComponent";
import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";

export function Buttons() {
  const { isCoding } = useContext(QuestionContext);
  return (
    <div className="flex mx-2 py-2 px-5 items-center justify-between border border-solid border-black ">
      <div className="left-buttons">
        <ButtonComponent buttonName="Question" />
        <ButtonComponent buttonName="Solution" />
      </div>
      <div className="code-button">
        <ButtonComponent buttonName={isCoding ? "<------ DRAW-BOARD" : "CODE-SPACE ------>"} buttonSpecial="code-space" />
        {/* <div>CODE-SPACE ------&gt;</div> */}
      </div>
    </div>
  )
}
