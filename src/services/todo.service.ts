import axiosClient from '@/config/axios';
import { Todo } from './types';

class ApiService {
  static getTodos = async (): Promise<Todo[]> => {
    return (await axiosClient.get('todos'))?.data;
  };
  static addTodo = async (todo: Todo): Promise<Todo[]> => {
    return (await axiosClient.post(`todos`, todo))?.data;
  };
  static updateTodo = async (id: number, todo: Todo): Promise<Todo[]> => {
    return (await axiosClient.put(`todos/${id}`, todo))?.data;
  };
  static deleteTodo = async (id: number): Promise<Todo[]> => {
    return (await axiosClient.delete(`todos/${id}`))?.data;
  };
}

export default ApiService;
