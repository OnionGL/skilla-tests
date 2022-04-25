import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getRecord, getUsers } from '../../API/API';

//async function Redux for get User in Data Base;
export const fetchUser = createAsyncThunk(
   'call/user',
   async function(date) {
      const {data} = await getUsers(date.startDate , date.endDate);
      return data;
   }
)
export const fetchRecord = createAsyncThunk(
   'call/record',
   async function(record , partnership_id) {
      const {data} = await getRecord(record , partnership_id);
      return data;
   }
)

const initialState = {
   user : [],
   record : [],
   isLoading : false,
   error: ''
}

export const CallReducer = createSlice ({
   name : 'call',
   initialState , 
   reducers: {
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUser.pending, (state, action) => {
         state.isLoading = true;
      })
      builder.addCase(fetchUser.fulfilled, (state, action) => {
         console.log(action.payload.results);
         state.user = action.payload.results;
         state.isLoading = false;
      })
      builder.addCase(fetchUser.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
      builder.addCase(fetchRecord.pending, (state, action) => {
         state.isLoading = true;
      })
      builder.addCase(fetchRecord.fulfilled, (state, action) => {
         console.log(action.payload);
         state.user = action.payload.results;
         state.isLoading = false;
      })
      builder.addCase(fetchRecord.rejected, (state, action) => {
         state.error = 'Не удалось загрузить данные';
      })
   }

})
export default CallReducer.reducer;