// import '../styles/QuestionTab.css';
import { useContext } from 'react';
import { Question } from '../components/Question.jsx';
import { ButtonTab } from './ButtonTab.jsx';
import { QuestionContext } from '../context/QuestionContext.js';

export function QuestionTab() {
    const { questionDetails } = useContext(QuestionContext);

    return (
        <div className="flex flex-col flex-1 font-jet-brains h-[calc(100vh-50px)]" >
            <ButtonTab />
            <Question questionDetails={questionDetails} />
        </div>
    )
}
