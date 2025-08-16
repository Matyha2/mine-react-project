import React from "react";

function App() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [answers, setAnswers] = React.useState({});

  const questions = [
    { id: 1, text: "React — это круто?", correct: "Да" },
    { id: 2, text: "Хуки — удобны?", correct: "Да" }
  ];

  const currentQuestion = questions[step - 1];

  const handleAnswer = (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const resetQuiz = () => {
    setOpen(false);
    setStep(1);
    setAnswers({});
  };

  let allCorrect = true;
  for (const q of questions) {
    if (answers[q.id] !== q.correct) {
      allCorrect = false;
      break;
    }
  }

  return (
    <div className="App">
      <button onClick={() => setOpen(true)} className="open-modal-btn">
        Открыть опрос
      </button>

      <div className={`overlay animated ${open ? "show" : ""}`}>
        <div className="modal">
          <svg
            className="image"
            onClick={resetQuiz}
            width="18"
            height="20"
            fill="currentColor"
          >
            <use href="/images/delete-icon.svg#trash" />
          </svg>

          <div className="quiz-content">
            {step <= questions.length ? (
              <>
                <p className="question-step">{currentQuestion.text}</p>
                <div className="options">
                  <button
                    className="btn-option"
                    onClick={() => handleAnswer(currentQuestion.id, "Да")}
                  >
                    Да
                  </button>
                  <button
                    className="btn-option"
                    onClick={() => handleAnswer(currentQuestion.id, "Нет")}
                  >
                    Нет
                  </button>
                </div>
              </>
            ) : (
              <div className="results">
                <h3>{allCorrect ? "✅ Верно!" : "❌ Есть ошибки"}</h3>
                {questions.map((q) => (
                  <p key={q.id}>
                    {q.text} - {answers[q.id] || "Нет ответа"}{" "}
                    {answers[q.id] === q.correct ? "✅" : "❌"}
                  </p>
                ))}
                <button className="btn-close" onClick={resetQuiz}>
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;