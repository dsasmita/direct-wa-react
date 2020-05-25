import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  hasErrors: false,
  histories: [
    {
      key: 'a1',
      phone: '085236725506',
      message: 'pesan baru 123456',
      date_time: '2020-01-01T00:00+07:00',
    },
    {
      key: 'a2',
      phone: '085236725502',
      message: 'pesan baru 123456-2',
      date_time: '2020-01-01T00:00+07:00',
    },
    {
      key: 'a3',
      phone: '085236725503',
      message: 'pesan baru 123456-3',
      date_time: '2020-01-01T00:00+07:00',
    },
  ],
};

const historiesSlice = createSlice({
  name: 'histories',
  initialState,
  reducers: {
    setHistory: (state, {payload}) => {
      state.histories = payload;
    },
  },
});

export const {setHistory} = historiesSlice.actions;

export const historiesSelector = (state) => state.histories;

export default historiesSlice.reducer;
