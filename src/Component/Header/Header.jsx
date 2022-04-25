import React from 'react'

//style css
import style from './Header.module.css'

//Component
import ProgressBar from '../ProgressBar/ProgressBar'

//Icon
import SearchIcon from '../../image/icon/search.png'
import ArrowIcon from '../../image/icon/arrow.png'
import AvatarIcon from '../../image/icon/avatar.png'

export default function Header() {
   //Array days
   let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ];
   const date = new Date() //today's date
   const day = date.getDay(); //today's day
   const month = date.toLocaleString('default', { month: 'long' }); //Month in string
   //info by statistics
   const statistics = [
      { title: 'Новые звонки', bgcolor: "#26a879", completed: '20 из 30' },
      { title: 'Качество разговоров', bgcolor: "#ffd500", completed: 40 },
      { title: 'Конверсия в заказ' , bgcolor: "#ea1b4f", completed: 67 },
    ];
   return (
      <div className={style.header}>
         <div className={style.progress}>
            <div style={{color : '#899CB1'}}>
               {days[day]}, {date.getDate()} {month[0].toUpperCase() + month.substr(1 , 2)}
            </div>
            <div className={style.progressbar}>
               {statistics.map((item, idx) => (
            <ProgressBar key={idx} title={item.title} bgcolor={item.bgcolor} completed={item.completed} />
             ))}  
            </div>
               
         </div>
         <div>
               <img style={{
                  width: 16,
                  height: 16,
                  marginRight: 64,
                  marginLeft: 197
               }} src={SearchIcon}/>
         </div> 
         <div style={{
            color : '#899CB1',
            whiteSpace: 'nowrap'
            }}>
            ИП Сидорова Александра Михайловна
            <img style={{marginLeft: 5}} src={ArrowIcon} alt="arrow" />
         </div>
         <div style={{
             color : '#899CB1',
             display: 'flex' , 
             justifyContent: 'center' ,
             alignItems: 'center',
             marginLeft: 47,
            }}>
            <img src={AvatarIcon} alt="avatar" />
            <div>
            <img style={{marginLeft: 5 , marginRight: 147}} src={ArrowIcon} alt="arrow" />
            </div>

         </div>
      </div>
   )
}
