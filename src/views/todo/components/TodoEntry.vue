<template>
  <div class="d-flex input-box">
    <input
      :value="props.title"
      type="text"
      class="form-control p-3"
      placeholder="Type something..."
      @keyup.enter="onSaveHandler"
      @input="emits('input', $event.target.value)"
    />
    <div
      class="bg bg-primary text-white p-3 cursor-pointer"
      @click="onSaveHandler"
    >
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

import { watch } from 'vue';

//props
const props = defineProps<Props>();

//emits
const emits = defineEmits(['on-search', 'input']);

//watchers
watch(
  () => props.title,
  (newData, oldData) => {
    if (newData !== oldData) {
      emits('input', newData);
    }
  }
);

//methods
const onSaveHandler = () => {
  emits('on-search');
};
</script>

<style scoped lang="scss">
.input-box {
  background: #7f8c8d;
  input[type='text'] {
    border: unset;
    background: transparent;
    color: white;
    &::placeholder {
      color: #bdc3c7;
    }
  }
}
.cursor-pointer {
  cursor: pointer;
}
</style>
