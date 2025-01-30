import React from "react";

function QuestionItem({ question, onDelete, onUpdate}) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onDelete(id); // Remove from state in parent component
        }
      });
  }

  function handleUpdate(event) {
    const updatedCorrectIndex = Number(event.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion); 
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select Value={correctIndex} onChange={handleUpdate}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;




