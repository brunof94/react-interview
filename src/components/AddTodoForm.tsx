import { useState } from 'react';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
  isLoading?: boolean;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, isLoading = false }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="add-todo-input"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={!title.trim() || isLoading}
        className="add-todo-btn"
      >
        {isLoading ? '...' : 'Add'}
      </button>
    </form>
  );
};

export default AddTodoForm;
