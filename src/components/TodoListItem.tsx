import { useState } from 'react';
import { TodoList } from '../types/todo';

interface TodoListItemProps {
  todoList: TodoList;
  onSelect: (todoList: TodoList) => void;
  onEdit: (todoList: TodoList) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todoList,
  onSelect,
  onEdit,
  onDelete,
  isSelected,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(todoList.name);

  const handleSave = () => {
    if (editName.trim() && editName !== todoList.name) {
      onEdit({ ...todoList, name: editName.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(todoList.name);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={`todo-list-item ${isSelected ? 'selected' : ''}`}
      onClick={() => !isEditing && onSelect(todoList)}
    >
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            autoFocus
            className="edit-input"
          />
        </div>
      ) : (
        <div className="view-mode">
          <h3 className="todo-list-title">{todoList.name}</h3>
          <div className="todo-list-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="edit-btn"
            >
              ✏️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todoList.id);
              }}
              className="delete-btn"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListItem;
