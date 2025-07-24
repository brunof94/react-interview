import { useState, useEffect } from "react";
import { TodoList, Todo } from "./types/todo";
import * as todoApi from "./services/todoApi";
import TodoListItem from "./components/TodoListItem";
import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForm";
import AddTodoListForm from "./components/AddTodoListForm";
import "./App.css";

function App() {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [selectedTodoList, setSelectedTodoList] = useState<TodoList | null>(
    null
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load todo lists on component mount
  useEffect(() => {
    loadTodoLists();
  }, []);

  // Load todos when a todo list is selected
  useEffect(() => {
    if (selectedTodoList) {
      loadTodos(selectedTodoList.id);
    } else {
      setTodos([]);
    }
  }, [selectedTodoList]);

  const loadTodoLists = async () => {
    try {
      setLoading(true);
      setError(null);
      const lists = await todoApi.getTodoLists();
      setTodoLists(lists);
    } catch (err) {
      setError("Failed to load todo lists");
      console.error("Error loading todo lists:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async (todoListId: number) => {
    try {
      setLoading(true);
      setError(null);
      const todoItems = await todoApi.getTodos(todoListId);
      setTodos(todoItems);
    } catch (err) {
      setError("Failed to load todos");
      console.error("Error loading todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodoList = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const newTodoList = await todoApi.createTodoList({ name });
      setTodoLists([...todoLists, newTodoList]);
    } catch (err) {
      setError("Failed to create todo list");
      console.error("Error creating todo list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodoList = async (updatedTodoList: TodoList) => {
    try {
      setError(null);
      await todoApi.updateTodoList(updatedTodoList.id, {
        name: updatedTodoList.name,
      });
      setTodoLists(
        todoLists.map((list) =>
          list.id === updatedTodoList.id ? updatedTodoList : list
        )
      );
      if (selectedTodoList?.id === updatedTodoList.id) {
        setSelectedTodoList(updatedTodoList);
      }
    } catch (err) {
      setError("Failed to update todo list");
      console.error("Error updating todo list:", err);
    }
  };

  const handleDeleteTodoList = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this todo list?")) {
      return;
    }

    try {
      setError(null);
      await todoApi.deleteTodoList(id);
      setTodoLists(todoLists.filter((list) => list.id !== id));
      if (selectedTodoList?.id === id) {
        setSelectedTodoList(null);
      }
    } catch (err) {
      setError("Failed to delete todo list");
      console.error("Error deleting todo list:", err);
    }
  };

  const handleSelectTodoList = (todoList: TodoList) => {
    setSelectedTodoList(todoList);
  };

  const handleCreateTodo = async (title: string) => {
    if (!selectedTodoList) return;

    try {
      setLoading(true);
      setError(null);
      const newTodo = await todoApi.createTodo(selectedTodoList.id, { title });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError("Failed to create todo");
      console.error("Error creating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    if (!selectedTodoList) return;

    try {
      setError(null);
      await todoApi.updateTodo(selectedTodoList.id, updatedTodo.id, {
        title: updatedTodo.title,
        completed: updatedTodo.completed,
      });
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!selectedTodoList) return;

    try {
      setError(null);
      await todoApi.deleteTodo(selectedTodoList.id, id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List Manager</h1>
        {error && <div className="error-message">{error}</div>}
      </header>

      <div className="app-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Todo Lists</h2>
          </div>

          <AddTodoListForm onAdd={handleCreateTodoList} isLoading={loading} />

          <div className="todo-lists">
            {todoLists.map((todoList) => (
              <TodoListItem
                key={todoList.id}
                todoList={todoList}
                onSelect={handleSelectTodoList}
                onEdit={handleUpdateTodoList}
                onDelete={handleDeleteTodoList}
                isSelected={selectedTodoList?.id === todoList.id}
              />
            ))}
          </div>
        </div>

        <div className="main-content">
          {selectedTodoList ? (
            <>
              <div className="main-header">
                <h2>{selectedTodoList.name}</h2>
              </div>

              <AddTodoForm onAdd={handleCreateTodo} isLoading={loading} />

              <div className="todos">
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
                {todos.length === 0 && !loading && (
                  <div className="empty-state">
                    No todos yet. Add one above!
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>Welcome to Todo List Manager</h2>
              <p>
                Select a todo list from the sidebar to get started, or create a
                new one.
              </p>
            </div>
          )}
        </div>
      </div>

      {loading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
}

export default App;
