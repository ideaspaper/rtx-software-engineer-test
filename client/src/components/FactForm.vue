<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      title="Cat Fact"
      :before-close="handleClickCancel"
    >
      <el-form
        v-model="form"
        label-width="60px"
        :label-position="'left'"
        v-loading="loadingFact"
      >
        <el-form-item label="Fact">
          <el-input
            v-model="form.text"
            @input="(value) => handleInputChange('text', value)"
            type="textarea"
            autosize
          />
        </el-form-item>
        <el-form-item label="Source">
          <el-input
            v-model="form.source"
            @input="(value) => handleInputChange('source', value)"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-input
            v-model="form.type"
            @input="(value) => handleInputChange('type', value)"
          />
        </el-form-item>
        <el-form-item label="Verified" prop="verified">
          <el-radio-group
            v-model="form.verified"
            @change="(value) => handleInputChange('verified', value)"
          >
            <el-radio :label="true" />
            <el-radio :label="false" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClickCancel">Cancel</el-button>
          <el-button
            type="primary" @click="handleClickSubmit"
            :loading="loadingSubmitFact"
          >Submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onUpdated } from 'vue';

export default {
  name: 'fact-form',
  props: ['modelValue', 'fact', 'loadingFact', 'loadingSubmitFact'],
  setup(props, context) {
    const dialogFormVisible = ref(false);
    const form = ref({
      id: null,
      text: null,
      source: null,
      type: null,
      verified: null,
    });

    const handleInputChange = (field, value) => {
      context.emit('update:modelValue', { ...props.modelValue, [field]: value });
    };

    const handleClickCancel = () => {
      context.emit('update:modelValue', { ...props.modelValue, displayFactForm: false });
    };

    const handleClickSubmit = () => {
      context.emit('submitEdit');
    };

    onUpdated(() => {
      dialogFormVisible.value = props.modelValue.displayFactForm;
      form.value.id = props.modelValue.id;
      form.value.text = props.modelValue.text;
      form.value.source = props.modelValue.source;
      form.value.type = props.modelValue.type;
      form.value.verified = props.modelValue.verified;
    });

    return {
      form,
      dialogFormVisible,
      handleClickCancel,
      handleClickSubmit,
      handleInputChange,
    };
  },
};
</script>
