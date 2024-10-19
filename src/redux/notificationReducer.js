import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    messages: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.messages.push(action.payload);
    },
    clearNotifications: (state) => {
      state.messages = [];
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
