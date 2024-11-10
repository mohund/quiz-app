import React from 'react';
import './Option.css';

function Option({ options, questionIndex, handleAnswerOptionClick, isDisabled }) { // Add isDisabled prop
    return (
        <div className="options-container">
            <ul className="options-list">
                {options.map((option, index) => (
                    <li key={index} className="option-item">
                        <label>
                            <input
                                type="radio"
                                name={`option-${questionIndex}`}
                                value={option.answerText}
                                onChange={() => handleAnswerOptionClick(questionIndex, option.isCorrect)}
                                disabled={isDisabled} // Disable input if isDisabled is true
                            />
                            {option.answerText}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Option;
