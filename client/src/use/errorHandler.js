import { ElMessage } from 'element-plus';

function errorHandler(error) {
  if (error.response) {
    const { statusText, data } = error.response;
    if (data.message) ElMessage.error(`${data.message}`);
    else ElMessage.error(`${statusText}`);
  } else {
    ElMessage.error(error.message);
  }
}

export default errorHandler;
