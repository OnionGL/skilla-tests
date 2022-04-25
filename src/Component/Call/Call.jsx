import React , {useState , useMemo, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

//style css
import style from './Call.module.css'

//Material UI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Select MaterialUI
import { MenuItem, Select, LinearProgress , Pagination} from '@mui/material';

//Component
import Header from '../Header/Header';
import {getUsers} from '../../API/API'

//Icon
import greatIcon from '../../image/icon/great.png'
import disableIcon from '../../image/icon/dissable.png'
import middleIcon from '../../image/icon/middle.png'
import gooddots from '../../image/icon/good_dots.png'
import middledots from '../../image/icon/middle_dots.png'

//MaterialUI DataPicker;
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { fetchRecord, fetchUser } from '../../Redux/reducers/call-reducer';

export default function Call() {
   const dispatch = useDispatch()
   //Call List Users
   const {user , isLoading} = useSelector(state => state.CallReducer)
   const [userList , setUserList] = useState(user)
   const [startDate , setStartDate] = useState(new Date('2015-04-15'))
   const [endDate , setEndDate] = useState(new Date())
   const [page , setPage] = useState(1);
   const [dropDown , setDropDown] = useState(false);
   const [typeCall , setTypeCall] = useState('Все звонки')
   const objectToGet = {
      startDate : startDate.toLocaleDateString('en-ca'),
      endDate: endDate.toLocaleDateString('en-ca'),
   }
   useEffect(() => {
      dispatch(fetchUser(objectToGet))
   },[])
   useEffect(() => {
      setUserList(user)
   },[user])
   useMemo(() => {
      if(user !== []){
         let filteredUsers = user.filter(item => {
         return typeCall === 'Все звонки' ? item : (typeCall === 'Входящие' ? item.in_out !== 0 : item.in_out !== 1 )
      })
      setUserList(filteredUsers)
      setPage(1)
      }
   },[typeCall])
   //Function to sort array by date
   const Sort = () => {
      dispatch(fetchUser(objectToGet))
      if(user !== []){
      let filteredUsers = user.filter(item => {
         return new Date(item.date_notime) > new Date(startDate.toLocaleDateString('en-ca')) && new Date(item.date_notime) < new Date(endDate.toLocaleDateString('en-ca'))
      })
      setUserList(filteredUsers)
      setPage(1)
      }
   }
   return <>
   <div className={style.call}>
      <Header />
      <div className={style.call__container}>
            <TableContainer style={{width: 1440}} component={Paper}>
               <div style={{
                  margin: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
               }}>
               <div style={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>

               <div style={{
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '100%',
                  color: '#899CB1',
                  display: 'flex',
                  alignItems: 'center'
               }}
               onClick={() => setDropDown(!dropDown)}>
               Поиск по дате
               <div className={dropDown ? style.rotateUp : style.rotateDown} style={{
                  	width: 0,
                     height: 0,
                     borderLeft: '4px solid transparent',
                     borderRight: '4px solid transparent',
                     borderTop: '6px solid #ADBFDF',
                     marginLeft: 3,
               }}></div>
               </div>
               {dropDown ? 
               <div style={{
                  width: '120%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 15
               }}>
               <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                           label="С"
                           inputFormat="MM/dd/yyyy"
                           value={startDate}
                           onChange={setStartDate}
                           renderInput={(params) => <TextField {...params} />}
                        />
                        &mdash;
                        <DesktopDatePicker
                           label="По"
                           inputFormat="MM/dd/yyyy"
                           value={endDate}
                           onChange={setEndDate}
                           renderInput={(params) => <TextField {...params} />}
                        />
                  </LocalizationProvider>
                  <button className={style.button__search} onClick={() => Sort()}>Поиск по датам</button>
                  </div>
               : null}
               </div>
                           <Select
                              value={typeCall}
                              variant='outlined'
                              style={{
                                 width: 150,
                                 height: 50,
                                 marginRight: 15,
                              }}
                              onChange={(e) => setTypeCall(e.target.value)}
                               >
                     <MenuItem value={"Все звонки"}>
                     Все звонки
                     </MenuItem>
                     <MenuItem value={"Входящие"}>
                     Входящие
                     </MenuItem>
                     <MenuItem value={"Исходящие"}>
                     Исходящие
                     </MenuItem>

                  </Select>
               </div>
               <Table aria-label="simple table">
                  <TableHead>
                     <TableRow className={style.table__head}>
                        <TableCell align="center">Тип</TableCell>
                        <TableCell align="center">Время</TableCell>
                        <TableCell align="center">Сотрудник</TableCell>
                        <TableCell align="center">Звонок</TableCell>
                        <TableCell align="center">Источник</TableCell>
                        <TableCell align="center">Оценка</TableCell>
                        <TableCell align="right">Длительность</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                  {isLoading ? <LinearProgress style={{width: '1440px'}} /> : null}
                     {userList
                     .slice((page-1)*10,(page-1)*10+10)
                     .map((user) => (
                        <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                           {user.in_out === 1 && user.status !== 'Не дозвонился' ? <img src={greatIcon}/> : (user.in_out == 0 && user.status !== 'Не дозвонился' ? <img src={middleIcon} /> : <img src={disableIcon} /> )}
                        </TableCell>
                        <TableCell align="center">{user.date?.split(' ')[1]}</TableCell>
                        <TableCell align="center"><img src={user.person_avatar}/></TableCell>
                        <TableCell align="center">{user.from_number?.replace(new RegExp(`(^\\d{${user.from_number?.length % 10}})(\\d{3})`),'+$1($2)')}</TableCell>
                        <TableCell align="center">{user.from_site === 0 ? 'С сайта' : ''}</TableCell>
                        <TableCell align="center">{user.in_out === 1 ? 
                        (<div>
                           <img src={gooddots}/>
                           <button className={style.good__call_button}>Отлично</button>
                        </div>) 
                        : 
                        (user.in_out !== '' ? (<div>
                              <img src={middledots}/>
                              <button className={style.middle__call_button}>Хорошо</button>
                           </div>) : <div></div>) 
                           }</TableCell>
                        <TableCell align="right">{user.time < 10 ? user.time.toString() + ':00' : user.time < 100 ? user.time.toString().split('').join(':0') : user.time.toString()[0] + (user.time.toString().length < 4 ? user.time.toString()[1] + ':0' : user.time.toString()[1] + ":") + user.time.toString()[2] + (user.time.toString()[3] ? user.time.toString()[3] : '')}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Pagination 
                  style={{
                     color: '#0057b7',
                     marginTop: 25,
                     marginBottom: 25,
                  }}
                  count={Number((userList.length / 10).toFixed(0))}
                  onChange={(_ ,value) => {
                     setPage(value); 
                     window.scroll(0, 450)
                  }}
               />
         </TableContainer>
      </div>
   </div>
   </>
}
