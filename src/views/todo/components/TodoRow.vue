<template>
  <li class="d-flex align-items-center row-container pe-4">
    <div
      class="d-flex align-items-center justify-content-center row-container__check"
      @click="emits('on-check')"
    >
      <em
        class="fas fa-check"
        :class="{
          'row-container__check--checked': props.completed,
        }"
      />
    </div>
    <div class="flex-grow-1 ms-2 p-2 row-container__title">
      <span
        class="text-secondary user-select-none"
        :class="{
          'text-strikethrough': props.completed,
        }"
      >
        {{ props.title }}
      </span>
    </div>
    <div
      class="ps-5 d-flex justify-content-end align-items-center row-container__action pe-2"
    >
      <em
        title="Edit"
        class="fas fa-edit text-muted me-2 fs-5 cursor-pointer"
        @click="emits('on-edit')"
      />
      <em
        title="Delete"
        class="fas fa-trash text-danger fs-5 cursor-pointer"
        @click="emits('on-delete')"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
interface Props {
  id: number;
  title: string;
  completed: boolean;
}

//props
const props = defineProps<Props>();

//emitters
const emits = defineEmits(['on-check', 'on-edit', 'on-delete']);
</script>

<style scoped lang="scss">
$check_border_color: #e6e6e6;
$checked_color: #27ae60;
$unchecked_color: #95a5a6;

.row-container {
  padding: unset !important;
  &__check {
    font-size: 20px;
    cursor: pointer;
    width: 50px;
    height: auto;
    color: $check_border_color;
    &--checked {
      color: $checked_color;
    }
  }
  &__title {
    border-left: 1px solid $check_border_color;
  }
}
.text-strikethrough {
  text-decoration: line-through;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
