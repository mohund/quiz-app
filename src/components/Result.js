import React from 'react';
import './Result.css';

function Result({ score, totalQuestions }) {
    return (
        <div className="result-card">
            <h2>Quiz Completed</h2>
            <p>
                You scored {score} out of {totalQuestions}
            </p>
        </div>
    );
}

export default Result;