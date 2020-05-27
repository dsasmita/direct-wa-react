import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

export const initialState = {
  loading: false,
  hasErrors: false,
  phone: '',
  histories: [],
};

const historiesSlice = createSlice({
  name: 'histories',
  initialState,
  reducers: {
    setHistory: (state, {payload}) => {
      state.histories = payload;
    },
    setPhone: (state, {payload}) => {
      state.phone = payload;
    },
  },
});

export const {setHistory, setPhone} = historiesSlice.actions;
export const historiesSelector = (state) => state.histories;
export default historiesSlice.reducer;

export const updateHistory = (props) => {
  const {newHistory, currentHistory} = props;
  return async (dispatch) => {
    try {
      let updatedHistory = currentHistory.concat(newHistory);
      const jsonValue = JSON.stringify(updatedHistory);
      await AsyncStorage.setItem('@chat_history', jsonValue);
      dispatch(setHistory(updatedHistory));
    } catch (error) {
      console.warn(error);
    }
  };
};

export const destroyHistory = () => {
  return async (dispatch) => {
    try {
      const jsonValue = JSON.stringify([]);
      await AsyncStorage.setItem('@chat_history', jsonValue);
      dispatch(setHistory([]));
    } catch (error) {
      console.warn(error);
    }
  };
};

export const fetchHistory = () => {
  return async (dispatch) => {
    try {
      const histories = await AsyncStorage.getItem('@chat_history');
      dispatch(setHistory(JSON.parse(histories)));
    } catch (error) {
      console.warn(error);
    }
  };
};
