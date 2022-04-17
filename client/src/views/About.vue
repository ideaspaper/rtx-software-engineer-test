<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <h1>Cat Facts</h1>
    <el-button
      type="primary"
      size="small"
      :loading="loadingFetchApi"
      @click="handleClickFetchApi"
    >Fetch from API</el-button>
    <FactForm
      v-model="formData"
      @submitEdit="handleSubmitEdit"
    />
    <CatFactsTable
      :loadingFacts="loadingFacts"
      :facts="formattedFacts"
      @clickEdit="handleClickEdit"
      @clickDelete="handleClickDelete"
    />
  </div>
</template>

<script>
import {
  ref, computed, onMounted, inject,
} from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import errorHandler from '../use/errorHandler';
import CatFactsTable from '../components/CatFactsTable.vue';
import FactForm from '../components/FactForm.vue';

export default {
  name: 'facts',
  setup() {
    const formData = ref({
      display: false,
      loading: false,
      loadingSubmit: false,
    });
    const baseUrl = inject('baseUrl');
    const facts = ref([]);
    const loadingFacts = ref(true);
    const loadingFetchApi = ref(false);

    const getFacts = async () => {
      loadingFacts.value = true;
      try {
        const { data } = await axios({
          url: `${baseUrl}/catfacts`,
          method: 'GET',
        });
        facts.value = data;
      } catch (error) {
        errorHandler(error);
      }
      loadingFacts.value = false;
    };

    const handleClickEdit = async (id) => {
      formData.value.display = true;
      formData.value.loading = true;
      try {
        const { data } = await axios({
          url: `${baseUrl}/catfacts/${id}`,
          method: 'GET',
        });
        formData.value = { ...formData.value, ...data };
      } catch (error) {
        formData.value.display = false;
        errorHandler(error);
        getFacts();
      }
      formData.value.loading = false;
    };

    const handleSubmitEdit = async () => {
      formData.value.loadingSubmit = true;
      try {
        const { data } = await axios({
          url: `${baseUrl}/catfacts/${formData.value.id}`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          data: formData.value,
        });
        ElMessage.success(data);
      } catch (error) {
        errorHandler(error);
      }
      formData.value.loadingSubmit = false;
      formData.value.display = false;
      getFacts();
    };

    const handleClickDelete = async (id) => {
      try {
        const { data } = await axios({
          url: `${baseUrl}/catfacts/${id}`,
          method: 'DELETE',
        });
        ElMessage.success(data.message);
      } catch (error) {
        errorHandler(error);
      }
      getFacts();
    };

    const handleClickFetchApi = async () => {
      loadingFetchApi.value = true;
      try {
        const { data } = await axios({
          url: `${baseUrl}/catfacts/fromSource`,
          method: 'GET',
        });
        ElMessage.success(data);
      } catch (error) {
        errorHandler(error);
      }
      loadingFetchApi.value = false;
      getFacts();
    };

    const formattedFacts = computed(() => facts.value.map((element) => {
      const formattedFact = { ...element };
      formattedFact.createdAt = (new Date(formattedFact.createdAt)).toLocaleString();
      formattedFact.updatedAt = (new Date(formattedFact.updatedAt)).toLocaleString();
      return formattedFact;
    }));

    onMounted(() => {
      getFacts();
    });

    return {
      facts,
      loadingFacts,
      formattedFacts,
      loadingFetchApi,
      formData,
      handleClickEdit,
      handleClickDelete,
      handleClickFetchApi,
      handleSubmitEdit,
    };
  },
  components: {
    CatFactsTable,
    FactForm,
  },
};
</script>
