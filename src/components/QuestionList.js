import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionItems, setQuestionItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestionItems(data));
  }, []);

  function handleDelete(id) {
    setQuestionItems(questionItems.filter((question) => question.id!== id));
  }

  function handleUpdate(updatedQuestion) {
    setQuestionItems(
      questionItems.map((question) => 
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );  
  }
//

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionItems.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}          
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
