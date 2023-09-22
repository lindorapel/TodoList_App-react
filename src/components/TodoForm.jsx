import { useState } from "react";
import PropTypes from "prop-types";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);

      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Input Todo"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
