import { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "../components/QuizCard";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fetchQuiz = async () => {
    const res = await axios.get("http://localhost:5000/api/quiz/random");
    setQuestions(res.data);
    setIndex(0);
    setAnswers({});
    setSubmitted(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuiz();
    };
    fetchData();
  }, []);

  const chooseAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = Object.keys(answers).filter((qid) => {
    const q = questions.find((x) => x._id === qid);
    return q && answers[qid] === q.correct;
  }).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-5">JLPT Mini Quiz</h1>

      {questions.length > 0 ? (
        <>
          {!submitted ? (
            <QuizCard
              question={questions[index]}
              index={index}
              total={questions.length}
              selected={answers[questions[index]._id]}
              chooseAnswer={chooseAnswer}
            />
          ) : (
            <div className="p-6 bg-white shadow rounded text-center">
              <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
              <p className="text-xl">
                Điểm của bạn:{" "}
                <span className="text-green-600 font-bold">
                  {score} / {questions.length}
                </span>
              </p>

              <button
                onClick={fetchQuiz}
                className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Làm lại quiz
              </button>
            </div>
          )}

          {!submitted && (
            <div className="flex justify-between mt-5">
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>

              {index === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setIndex(index + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
}
