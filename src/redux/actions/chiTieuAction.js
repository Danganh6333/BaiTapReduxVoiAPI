import {createAsyncThunk} from '@reduxjs/toolkit';
import {addChiTieu,searchChiTieu} from '../reducers/chiTieuReducer';
const api_url = 'https://65bb0b66b4d53c066553e4dc.mockapi.io/chiTieu';

export const fetchChiTieuApi = () => {
  return async dispatch => {
    try {
      const response = await fetch(api_url);
      const data = await response.json();

      data.forEach(row => {
        dispatch(addChiTieu(row));
        console.log(row);
      });
    } catch (err) {
      console.error('Error fetching todos:', error);
    }
  };
};
export const deleteChiTieuApi = createAsyncThunk(
  'chiTieu/deleteChiTieuAPI',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return id;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const addChiTieuApi = createAsyncThunk(
  'chiTieu/addChiTieuAPI',
  async (objChiTieu, thunkAPI) => {
    console.log(objChiTieu);
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objChiTieu),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const updateChiTieuApi = createAsyncThunk(
  'chiTieu/updateChiTieu',
  async (objChiTieu, thunkAPI) => {
    try {
      const response = await fetch(`${api_url}/${objChiTieu.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objChiTieu.data),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const searchChiTieuApi = createAsyncThunk(
  'chiTieu/searchChiTieu',
  async (keyword, thunkAPI) => {
    try {
      const response = await fetch(`${api_url}?tieuDe=${keyword}`);
      const data = await response.json();
      thunkAPI.dispatch(searchChiTieu(data)); 
    } catch (error) {
      console.error('Error searching chi tieu:', error);
    }
  }
);

