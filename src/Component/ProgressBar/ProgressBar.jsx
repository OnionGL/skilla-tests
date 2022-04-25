import React from 'react'

export default function ProgressBar(props) {
  const { title , bgcolor, completed } = props;
  const numbers = typeof completed === 'string' ? completed.split(' из ') : completed
  const containerStyles = {
   height: 6,
   width: 156,
   borderRadius: 50,
   background: '#DEE6F5',
   borderRadius: 12
 }
 const fillerStyles = {
   height: '100%',
   width: numbers[1] === undefined ? `${completed}%` : `${Math.floor((Number(numbers[0]) / Number(numbers[1]))*100)}%`,
   backgroundColor: bgcolor,
   borderRadius: 'inherit',
   textAlign: 'right'
 }

 const labelStyles = {
   padding: 5,
   color: 'white',
   fontWeight: 'bold'
 }
  return <>
  <div style={{
     display: 'flex',
     flexDirection: 'column'
  }}>
     <label style={{fontSize: 14 , marginBottom: 10}}>{title} {typeof completed === 'number' ? completed + "%" : completed}</label>
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  </div>
  
  </>;
}
