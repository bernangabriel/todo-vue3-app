<template>
  <div class="border rounded shadow pt-3 mt-3 w-50 main-container">
    <h1 class="text-center text-primary mb-4">My TODO List</h1>
    <todo-entry
      :title="todoTitle"
      @input="onChangeEntryHandler"
      @on-search="onSaveHandler()"
    />
    <ul class="list-group list-group-flush">
      <div class="border-top" />
      <todo-row
        :id="item.id"
        :title="item.title"
        :completed="item.completed"
        class="list-group-item"
        v-for="(item, index) in todos"
        :key="`todo-${index}`"
        @on-check="onCheckHandler(item)"
        @on-edit="onEditHandler(index, item)"
        @on-delete="onDeleteHandler(index, item)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
//core
import { ref, onMounted } from 'vue';

//components
import { TodoEntry, TodoRow } from './components';

//services
import todoService from '@/services/todo.service';

//types
import { Todo } from '../../services/types';

//reactive properties
const todos = ref<Todo[]>([]);
const selectedTodo = ref<Todo | null>(null);
const selectedTodoIndex = ref<number | null>(null);
const todoTitle = ref<string>();

//constants
const RECORDS_SIZE = 15;

//methods
const fetchTodos = async () => {
  const response: Todo[] = await todoService.getTodos();
  todos.value = response.slice(0, RECORDS_SIZE);
};

const onCheckHandler = async (todo: Todo) => {
  if (todo?.id) {
    const payload = {
      ...todo,
      completed: !todo.completed,
    };

    if (!todo.isManually) {
      await todoService.updateTodo(todo.id, payload);
    }

    //set record as completed
    todo.completed = payload.completed;
  }
};

const onChangeEntryHandler = (value: string) => {
  todoTitle.value = value;
};

const onEditHandler = async (todoIndex: number, todo: Todo) => {
  selectedTodo.value = { ...todo };
  selectedTodoIndex.value = todoIndex;
  todoTitle.value = todo.title;
};

const onDeleteHandler = async (todoIndex: number, todo: Todo) => {
  if (!todo.isManually) await todoService.deleteTodo(todo.id);

  todos.value.splice(todoIndex, 1);

  clearSelectedTodo();
};

const clearSelectedTodo = () => {
  selectedTodo.value = null;
  selectedTodoIndex.value = null;
  todoTitle.value = '';
};

const onSaveHandler = async () => {
  if (todoTitle.value) {
    const payload = {
      title: todoTitle.value,
      completed: selectedTodo.value?.completed ?? false,
      isManually: !selectedTodo.value?.isManually,
    };

    //add new
    if (!selectedTodo.value?.id) {
      const response = await todoService.addTodo(payload);
      if (response) {
        todos.value.unshift(response);
      }
    } else {
      //update existing
      if (!selectedTodo.value?.isManually) {
        await todoService.updateTodo(selectedTodo.value?.id, payload);
      }
      todos.value[selectedTodoIndex.value!!].title = payload.title;
    }
    clearSelectedTodo();
  }
};

//lifecycle hooks
onMounted(() => {
  fetchTodos();
});
</script>

<style scoped lang="scss">
.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 767px) {
  .main-container {
    width: 95% !important;
  }
}
</style>
