import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { SearchPages } from "./SearchBar";
import data from "../data/data.json";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [showType, setShowType] = useState("All");

  useEffect(() => {
    // Cek apakah localStorage sudah memiliki data
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    if (localStorageTodos && localStorageTodos.length > 0) {
      // Jika ada data di localStorage, gunakan data tersebut
      setTodos(localStorageTodos);
    } else {
      // Jika tidak ada data di localStorage, gunakan data dari data.json
      localStorage.setItem("todos", JSON.stringify(data));
      setTodos(data);
    }
  }, []);

  // Fungsi untuk menambahkan tugas baru
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, complete: false, isEditing: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Fungsi untuk mengubah status tugas (selesai/belum selesai)
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Fungsi untuk menghapus tugas
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Fungsi untuk mengaktifkan mode pengeditan tugas
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Fungsi untuk menyimpan perubahan tugas yang diedit
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Fungsi untuk meng-handle perubahan pada input pencarian
  const onSearchEventHandler = (event) => {
    setSearchTitle(event.target.value);
  };

  // Filter daftar tugas berdasarkan kata kunci pencarian
  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Fungsi untuk mengatur jenis tampilan tugas (All, Done Task, Todo)
  const ShowTodo = (type) => {
    setShowType(type);
  };

  // Fungsi untuk menghapus semua tugas
  const DeleteAll = () => {
    if (todos.length === 0) {
      alert("Tambahkan Todo terlebih dahulu");
    } else {
      const confirmDelete = window.confirm(
        "Apakah kamu yakin akan menghapus task yang sudah selesai??"
      );
      if (confirmDelete) {
        // Menghapus semua data dari localStorage
        localStorage.removeItem("todos");
        // Mengosongkan state 'todos'
        setTodos([]);
      }
    }
  };

  // Fungsi untuk menghapus semua tugas yang sudah selesai
  const DeleteDoneTask = () => {
    const hasCompletedTodos = todos.some((todo) => todo.complete);
    //mengecek todo yang selesai
    if (todos.length === 0) {
      alert("Tambahkan Todo terlebih dahulu");
    } else if (!hasCompletedTodos) {
      alert(
        "Tidak ada todo yang selesai, Kerjakan semua todo kamu. dont be lazy Person !!!"
      );
    } else {
      const confirmDelete = window.confirm(
        "Apakah kamu yakin akan menghapus task yang sudah selesai??"
      );

      if (confirmDelete) {
        const incompleteTodos = todos.filter((todo) => !todo.complete);

        // Menghapus tugas yang sudah selesai
        setTodos(incompleteTodos);
        localStorage.setItem("todos", JSON.stringify(incompleteTodos));
      }
    }
  };

  return (
    <Card border="info" className="d-flex my-5 mx-3">
      <div
        className="TodoWrapper text-center p-5 rounded-2"
        style={{ backgroundColor: "#191919" }}
      >
        <h1 className="text-light fw-bold fs-2 mb-3">
          TodoList.<span className="text-info">App</span>
        </h1>

        <TodoForm addTodo={addTodo} />
        <SearchPages
          searchTitle={searchTitle}
          onSearch={onSearchEventHandler}
        />

        <div className="filter-todo d-flex justify-content-between column-gap-3 pb-3">
          <Button onClick={() => ShowTodo("All")}>All</Button>
          <Button onClick={() => ShowTodo("Done Task")}>Done Task</Button>
          <Button onClick={() => ShowTodo("Todo")}>Todo</Button>
        </div>
        {filteredTodos
          .filter((todo) => {
            if (showType === "All") return true;
            if (showType === "Done Task") return todo.complete;
            if (showType === "Todo") return !todo.complete;
          })
          .map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} key={index} />
            ) : (
              <Todo
                task={todo}
                key={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
        <div className="filter-todo d-flex justify-content-between column-gap-3 pb-3">
          <Button onClick={DeleteAll}>Delete All</Button>
          <Button onClick={DeleteDoneTask}>Delete All Done Task</Button>
        </div>
      </div>
    </Card>
  );
};

TodoWrapperLocalStorage.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      task: PropTypes.string,
      complete: PropTypes.bool,
      isEditing: PropTypes.bool,
    })
  ),
  addTodo: PropTypes.func,
  toggleComplete: PropTypes.func,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
  editTask: PropTypes.func,
};
