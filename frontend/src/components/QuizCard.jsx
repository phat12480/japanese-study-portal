export default function QuizCard({
  question,
  index,
  total,
  selected,
  chooseAnswer,
}) {
  const options = [
    { key: "A", text: question.optionA },
    { key: "B", text: question.optionB },
    { key: "C", text: question.optionC },
    { key: "D", text: question.optionD },
  ];

  return (
    <div className="bg-white shadow p-5 rounded">
      <h2 className="text-lg font-bold mb-4">
        Câu {index + 1}/{total}
      </h2>

      <p className="text-xl font-medium mb-4">{question.question}</p>

      <div className="space-y-3">
        {options.map((op) => (
          <button
            key={op.key}
            onClick={() => chooseAnswer(question._id, op.key)}
            className={`w-full text-left px-4 py-2 rounded border
              ${
                selected === op.key
                  ? "bg-blue-100 border-blue-600"
                  : "bg-gray-100"
              }
            `}
          >
            <span className="font-bold mr-2">{op.key}.</span>
            {op.text}
          </button>
        ))}
      </div>
    </div>
  );
}
