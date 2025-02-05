import React from "react";
import Question from "./question";

function Questions() {
  const questions = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credic cards, including Visa, MasterCard and other trusted secure payment platforms.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credic cards, including Visa, MasterCard and other trusted secure payment platforms.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credic cards, including Visa, MasterCard and other trusted secure payment platforms.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credic cards, including Visa, MasterCard and other trusted secure payment platforms.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credic cards, including Visa, MasterCard and other trusted secure payment platforms.",
    },
  ];
  return (
    <div className="lg:w-3/4 mt-16 flex flex-col items-center space-y-5">
      {questions.map((q, i) => (
        <Question key={i} question={q.question} answer={q.answer} />
      ))}
    </div>
  );
}

export default Questions;
