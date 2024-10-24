
// Cell.jsx
import React from 'react'

export const Cell = ({
  props, 
  className, 
  onClick, 
  onContextMenu,
  isToday, 
  isDate, 
  isMenu, 
  mark,
  hasRedX,
  pos 
}) => {
  if(pos !== undefined) {
    for(let i = 0; i < pos.length; i++) {
      const posDate = new Date(pos[i]);
      const posDay = posDate.getUTCDate();
      
      if(isDate && props === posDay) {
        mark = true;
      }
    }
  }

  className = `${className} flex items-center border-b border-r relative
    ${onClick ? 'hover:bg-gray-100 cursor-pointer ' : ''}
    ${mark ? 'redx text-end ' : ''}
    ${isDate ? ' h-20 justify-left items-stretch ' : ''}
    ${isMenu ? '  h-9 justify-center text-lg  font-bold'  : ''}
  `

  return (
    <div 
      onClick={isToday ? undefined : onClick}
      onContextMenu={onContextMenu}
      className={className}
    >
      <span className="p-1">{props}</span>
      {hasRedX && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 font-bold text-6xl">
        🤢
        </span>
      )}
    </div>
  )
}