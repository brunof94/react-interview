import { useState } from 'react';

interface AddTodoListFormProps {
  onAdd: (name: string) => void;
  isLoading?: boolean;
}

const AddTodoListForm: React.FC<AddTodoListFormProps> = ({ onAdd, isLoading = false }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todolist-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Create a new todo list..."
        className="add-todolist-input"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={!name.trim() || isLoading}
        className="add-todolist-btn"
      >
        {isLoading ? '...' : 'Create List'}
      </button>
    </form>
  );
};

export default AddTodoListForm;
