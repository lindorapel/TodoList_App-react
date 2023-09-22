import { useState } from "react";
import PropTypes from "prop-types";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />

      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

EditTodoForm.propTypes = {
  editTodo: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    complete: PropTypes.bool,
    isEditing: PropTypes.bool,
  }),
};
