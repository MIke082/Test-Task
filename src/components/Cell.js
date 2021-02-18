
import React from 'react';
import './Cell.css';

const Cell = ({ row, col, onMouseOver }) => {
       return (
              <div onMouseOver={() => onMouseOver(row, col)} className='cell'></div>
       )
};

export default Cell;