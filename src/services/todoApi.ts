import { TodoList, Todo, CreateTodoListRequest, CreateTodoRequest, UpdateTodoRequest, UpdateTodoListRequest } from '../types/todo';

const API_BASE_URL = '/api';

// TodoList API functions
export const getTodoLists = async (): Promise<TodoList[]> => {
  const response = await fetch(`${API_BASE_URL}/todolists`);
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch todo lists');
  }
  return response.json();
};

export const createTodoList = async (data: CreateTodoListRequest): Promise<TodoList> => {
  const response = await fetch(`${API_BASE_URL}/todolists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo list');
  }
  return response.json();
};

export const updateTodoList = async (id: number, data: UpdateTodoListRequest): Promise<TodoList> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo list');
  }
  return response.json();
};

export const deleteTodoList = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo list');
  }
};

// Todo API functions
export const getTodos = async (todoListId: number): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/todos`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const createTodo = async (todoListId: number, data: CreateTodoRequest): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (todoListId: number, todoId: number, data: UpdateTodoRequest): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/todos/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (todoListId: number, todoId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/todolists/${todoListId}/todos/${todoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};
