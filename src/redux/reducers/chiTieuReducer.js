import {createSlice} from '@reduxjs/toolkit';
import {
  addChiTieuApi,
  deleteChiTieuApi,
  updateChiTieuApi,
} from '../actions/chiTieuAction';


const initialState = {
  listChiTieu: [],
};

const chiTieuSlice = createSlice({
  name: 'ChiTieu',
  initialState,
  reducers: {
    addChiTieu(state, action) {
      state.listChiTieu.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteChiTieuApi.fulfilled, (state, action) => {
        state.listChiTieu = state.listChiTieu.filter(
          row => row.id != action.payload,
        );
      })
      .addCase(deleteChiTieuApi.rejected, (state, action) => {
        console.log('Xóa chi tiêu bị từ chối', action.error.message);
      });
      
    builder.addCase(addChiTieuApi.fulfilled, (state, action) => {
      state.listChiTieu.push(action.payload);
    });
    
    builder.addCase(updateChiTieuApi.fulfilled, (state, action) => {
      const {id, tieuDe, moTa, ngayThuChi, loaiThuChi, soTien} = action.payload;
      const chiTieu = state.listChiTieu.find(row => row.id === id)
      if(chiTieu){
        chiTieu.tieuDe = tieuDe,
        chiTieu.moTa = moTa,
        chiTieu.ngayThuChi = ngayThuChi,
        chiTieu.loaiThuChi = loaiThuChi,
        chiTieu.soTien = soTien
      }
    });
  },
});
export const {addChiTieu,searchChiTieu} = chiTieuSlice.actions;
export default chiTieuSlice.reducer
