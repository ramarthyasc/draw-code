import '../styles/QuestionTab.css';
import { useRef, useState, useEffect } from 'react';
import { Question } from '../components/Question.jsx';
import { Buttons } from './Buttons.jsx';

export function QuestionTab(props) {

    return (
      <div className="question-tab">
        <Buttons />
        <Question questionDetails={props.questionDetails} />
      </div>
    )
}
