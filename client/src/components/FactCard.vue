<template>
  <el-card class="box-card">
    <p>Id: {{ fact.id }}</p>
    <p>User: {{ fact.user }}</p>
    <p>Fact: {{ fact.text }}</p>
    <p>Source: {{ fact.source }}</p>
    <p>Type: {{ fact.type }}</p>
    <p>Verified: {{ fact.verified }}</p>
    <p>Created At: {{ fact.createdAt }}</p>
    <p>Updated At: {{ fact.updatedAt }}</p>
    <template #header>
      <el-button
        type="primary"
        size="small"
        @click="handleClickEdit(fact.id)"
        >Edit</el-button
      >
      <el-button
        type="danger"
        size="small"
        @click="handleClickDelete(fact.id)"
        >Delete</el-button
      >
    </template>
  </el-card>
</template>

<script>
import { ElMessageBox } from 'element-plus';

export default {
  name: 'fact-card',
  props: ['fact'],
  setup(props, context) {
    const handleClickEdit = (id) => {
      context.emit('clickEdit', id);
    };

    const handleClickDelete = (id) => {
      ElMessageBox.confirm('Do you want to delete this fact?')
        .then(() => {
          context.emit('clickDelete', id);
        })
        .catch(() => { });
    };

    return {
      handleClickEdit,
      handleClickDelete,
    };
  },
};
</script>
