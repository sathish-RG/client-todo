import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from '@/services/instance';

// ✅ Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await instance.get('/tasks');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await instance.post('/tasks', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }) => {
  const response = await instance.put(`/tasks/${id}`, taskData);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await instance.delete(`/tasks/${id}`);
  return id;
});

// ✅ Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
    .addCase(updateTask.fulfilled, (state, action) => {
  state.items = state.items.map(task =>
    task._id === action.payload._id ? action.payload : task
  );
})
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
