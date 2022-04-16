<template>
  <el-table v-loading="loadingFacts" :data="facts">
    <el-table-column type="expand">
      <template #default="props">
        <FactCard
          :fact="props.row"
          @clickEdit="handleClickEdit"
          @clickDelete="handleClickDelete"
        />
      </template>
    </el-table-column>
    <el-table-column prop="id" label="Id" width="250" />
    <el-table-column prop="user" label="User" width="250" />
    <el-table-column prop="text" label="Fact" />
    <el-table-column prop="createdAt" label="Created At" sortable width="180" />
    <el-table-column prop="updatedAt" label="Updated At" sortable width="180" />
  </el-table>
</template>

<script>
import FactCard from './FactCard.vue';

export default {
  name: 'cat-facts-table',
  props: ['loadingFacts', 'facts'],
  setup(props, context) {
    const handleClickEdit = (id) => {
      context.emit('clickEdit', id);
    };

    const handleClickDelete = (id) => {
      context.emit('clickDelete', id);
    };

    return {
      handleClickEdit,
      handleClickDelete,
    };
  },
  components: { FactCard },
};
</script>
