import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import './Quiz.css';

const questions = [
    {
        questionText: 'Which team won the NBA Championship in 2024?',
        options: [
            { answerText: 'Denver Nuggets', isCorrect: false },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: true },
        ],
    },
    {
        questionText: 'Which team won the NBA Championship in 2023?',
        options: [
            { answerText: 'Denver Nuggets', isCorrect: true },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team claimed the NBA title in 2022?',
        options: [
            { answerText: 'Golden State Warriors', isCorrect: true },
            { answerText: 'Boston Celtics', isCorrect: false },
            { answerText: 'Milwaukee Bucks', isCorrect: false },
            { answerText: 'Phoenix Suns', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team won the NBA Championship in 2021?',
        options: [
            { answerText: 'Milwaukee Bucks', isCorrect: true },
            { answerText: 'Phoenix Suns', isCorrect: false },
            { answerText: 'Los Angeles Lakers', isCorrect: false },
            { answerText: 'Atlanta Hawks', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team won the NBA title in 2020?',
        options: [
            { answerText: 'Los Angeles Lakers', isCorrect: true },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Toronto Raptors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team was the runner-up in the NBA Finals in 2022?',
        options: [
            { answerText: 'Boston Celtics', isCorrect: true },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Milwaukee Bucks', isCorrect: false },
        ],
    },
];

function Quiz() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120); // Timer: 2 minutes
    const [isTimeUp, setIsTimeUp] = useState(false); // Tracks if time is up

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsTimeUp(true); // Set time up state to true
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer); // Cleanup
    }, [timeLeft]);

    const handleAnswerOptionClick = (questionIndex, isCorrect) => {
        if (isTimeUp) return; // Prevent interaction if time is up
        const newAnswers = [...answers];
        newAnswers[questionIndex] = isCorrect;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const newScore = answers.filter((answer) => answer === true).length;
        setScore(newScore);
        setShowResult(true);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const progressPercentage = () => {
        const answeredQuestions = answers.filter((answer) => answer !== null).length;
        return (answeredQuestions / questions.length) * 100;
    };

    return (
        <div className="quiz">
            {showResult ? (
                <Result score={score} totalQuestions={questions.length} />
            ) : (
                <div>
                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <div
                            style={{
                                width: `${progressPercentage()}%`,
                                backgroundColor: '#4caf50',
                                height: '10px',
                                borderRadius: '5px',
                            }}
                        ></div>
                        <p>
                            Progress: {answers.filter((answer) => answer !== null).length}/{questions.length}
                        </p>
                    </div>

                    {/* Timer */}
                    <p>Time Left: {formatTime(timeLeft)}</p>

                    {questions.map((question, index) => (
                        <Question
                            key={index}
                            question={question}
                            questionIndex={index}
                            handleAnswerOptionClick={handleAnswerOptionClick}
                            isDisabled={isTimeUp} // Pass disabled state to Question component
                        />
                    ))}

                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={isTimeUp}
                    >
                        Submit
                    </button>
                    {isTimeUp && <p style={{ color: 'red' }}>Time's up! All buttons are disabled.</p>}
                </div>
            )}
        </div>
    );
}

export default Quiz;
