import React from 'react';
import Option from './Option';
import './Question.css';

function Question({ question, questionIndex, handleAnswerOptionClick, isDisabled }) {
    return (
        <div className="question-card">
            <h2>{question.questionText}</h2>
            <Option
                options={question.options}
                questionIndex={questionIndex}
                handleAnswerOptionClick={handleAnswerOptionClick}
                isDisabled={isDisabled} // Pass isDisabled to Option component
            />
        </div>
    );
}

export default Question;
