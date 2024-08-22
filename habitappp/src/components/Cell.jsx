import React from 'react'


export const Cell = ({props, className, onClick, isToday, isDate, isMenu,mark,mark2, pos }) => {
  

    if(pos !== undefined){
        for(let i = 0; i < pos.length; i++){
            if(isDate && props == pos[i] ){
                mark = true
            }
        }
    }
    className = `${className}   flex items-center border-b border-r 
    ${onClick ? 'hover:bg-gray-100 cursor-pointer ' : ''}
    ${mark ? 'redx text-end ' : ''}
    ${isDate ? ' h-20 justify-left items-stretch ' : ''}
    ${isMenu ? '  h-9 justify-center text-lg  font-bold'  : ''}
    `

    return (


        <>
        <div onClick={isToday ? undefined : onClick} className={className}  >{props}</div>
        
        </>
  )
}
