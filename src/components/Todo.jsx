import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo d-flex justify-content-between align-items-center">
      <span
        className={`${
          task.complete
            ? "complete overflow-hidden text-info text-start text-decoration-line-through pe-3"
            : "incomplete overflow-hidden text-start pe-3"
        }`}
      >
        {task.task}
      </span>
      <div className="filter-icon">
        <FontAwesomeIcon
          icon={faSquareCheck}
          className={`${task.complete ? "todo-icon text-info" : "todo-icon"}`}
          size="lg"
          onClick={() => toggleComplete(task.id)}
        />
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="todo-icon text-warning mx-2"
          size="lg"
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="todo-icon text-danger"
          size="lg"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    complete: PropTypes.bool,
    isEditing: PropTypes.bool,
  }),
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
  toggleComplete: PropTypes.func,
};
