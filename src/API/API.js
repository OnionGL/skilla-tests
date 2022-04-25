import axios from "axios";
const token = "testtoken";
export const getUsers = (dataStart , dataEnd) => {
   return axios.post(`https://api.skilla.ru/mango/getList?date_start=${dataStart}&date_end=${dataEnd}`,null,{headers : {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
   }})
} 
export const getRecord = (record , partnership_id) => {
   return axios.post(`https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnership_id}`,null,{headers : {
      'Content-Type': 'audio/mpeg ; audio/x-mpeg ; audio/x-mpeg-3 ; audio/mpeg3',
      'Content-Transfer-Encoding': 'binary',
      'Content-Disposition': 'filename="record.mp3',
      "Authorization" : `Bearer ${token}`
   }})
} 
