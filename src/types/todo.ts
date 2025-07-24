export interface TodoList {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  todolist_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTodoListRequest {
  name: string;
}

export interface CreateTodoRequest {
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface UpdateTodoListRequest {
  name?: string;
}
