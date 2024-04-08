import { configureStore } from "@reduxjs/toolkit";
import chiTieuReducer from "../reducers/chiTieuReducer"
export default configureStore({
    reducer:{
        listChiTieu:chiTieuReducer
    }
});