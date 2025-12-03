import React, { useState } from "react";
import './Quiz.css';
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null); // store user’s choice
  const [finished, setFinished] = useState(false);

  const question = data[index];

  const checkAns = (e, ans) => {
    if (lock) return; // prevent multiple clicks
    setSelected(ans);

    if (question.ans === ans) {
      e.currentTarget.classList.add("correct");
    } else {
      e.currentTarget.classList.add("wrong");

      // highlight correct answer
      const options = document.querySelectorAll("li");
      options[question.ans - 1].classList.add("correct");
    }

    setLock(true);
  };

  const nextQuestion = () => {
    // ✅ score update happens here
    if (selected === question.ans) {
      setScore(score + 1);
    }

    if (index < data.length - 1) {
      setIndex(index + 1);
      setLock(false);
      setSelected(null);

      // reset styles
      const options = document.querySelectorAll("li");
      options.forEach((li) => li.classList.remove("correct", "wrong"));
    } else {
      setFinished(true); // quiz is over
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setLock(false);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {finished ? (
        <div className="result">
          <h2>Quiz Finished 🎉</h2>
          <p>Your Score: {score} / {data.length}</p>
          <button onClick={restartQuiz}>Restart</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
      
          <button onClick={nextQuestion}>
            {index === data.length - 1 ? "Finish" : "Next"}
          </button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
