<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'facts',
  setup() {
    const facts = ref([]);
    const getFacts = async () => {
      // Get data from backend
    };
    onMounted(() => {
      getFacts();
    });

    return {
      facts,
    };
  },
};

</script>
