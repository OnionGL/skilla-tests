import * as React from 'react';

//Material UI Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//react-router-dom
import {Link} from 'react-router-dom'

//Icon
import Image from '../../image/Union.png'
import Icon1 from '../../image/icon/1.png'
import Icon2 from '../../image/icon/2.png'
import Icon3 from '../../image/icon/3.png'
import Icon4 from '../../image/icon/4.png'
import Icon5 from '../../image/icon/5.png'
import Icon6 from '../../image/icon/6.png'
import Icon7 from '../../image/icon/7.png'
import Icon8 from '../../image/icon/8.png'
import Icon9 from '../../image/icon/9.png'
import Icon10 from '../../image/icon/10.png'
import IconAdd from '../../image/icon/add.png'
import IconInfo from '../../image/icon/payInfo.png'
import styles from './NavBar.module.css'

export default function NavBar() {
  const arrayIcon = [
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    Icon5,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
    Icon10
  ]
   return (
      <div style={{
         width: 240,
         position: 'relative',
         top: 0,
         left:0,
         height: 1080,
         background: '#091336',
         margin: 0,
         fontWeight: '500',
         fontSize: 16,
         color: 'rgba(255, 255, 255, 0.6)',
         zIndex: 2
      }}>
      <img style={{margin: 20}} src={Image}/>
      <List style={{
         display: 'flex',
         flexDirection: 'column',
         marginBottom: 52
      }}>
        {['Итоги' , 'Заказы' , 'Сообщения' , 'Звонки' , 'Контрагенты' , 'Документы' , 'Исполнители' , 'Отчеты' , 'База знаний' , 'Настройки'].map((name , index) => 
            <Link className={styles.link} to='/'>
            <ListItem button key={index}>
                <img className={styles.icon} src={arrayIcon[index]} alt={name} />
                <ListItemText primary={name} />
            </ListItem>
          </Link>  
        )}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <button className={styles.button}>Добавить заказ <img src={IconAdd}/></button>
        <button className={styles.button}>Оплата <img src={IconInfo}/></button>
      </div>
      </List>
    </div>
   )
}
