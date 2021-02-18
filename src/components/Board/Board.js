import React, { useState, useCallback } from "react";
import './Board.css';
import Cell from "../Cell";
import { getResource } from "../../services/Services";

const Board = () => {
    const [selectValue, setSelectValue] = useState();
    const [fieldSize, setFieldSize] = useState(0);
    const [hoverHistory, setHoverHistory] = useState([]);

    const handleChange = useCallback((e) => {
        setSelectValue(e.target.value);
    }, [])

    const handleClickStark = useCallback(async () => {
        const object = await getResource();
        for (const key in object) {
            if (key === selectValue) {
                const element = object[key];
                setFieldSize(element.field);
            }
        }
    }, [selectValue])

    const handleHover = useCallback((row, col) => {
        setHoverHistory((prevHistory) => [...prevHistory, { row, col }])
    }, [])

    return (
        <div >
            <select
                name="selectOptions"
                multiple=''
                onChange={handleChange}
                defaultValue='pickMode'
            >
                <option value='pickMode' disabled>Pick mode</option>
                <option value='easyMode'>Easy mode</option>
                <option value='normalMode'>Normal mode</option>
                <option value='hardMode'>Hard mode</option>
            </select>
            <button className='btn'
                onClick={handleClickStark}>Start
                </button>
            <div className='divMain'>
                <div className='divBoard'>
                    {[...new Array(fieldSize)].map((x, rowIndex) => {
                        return (
                            <div key={rowIndex} >
                                {[...new Array(fieldSize)].map((y, colIndex) => {
                                    return (
                                        <Cell
                                            key={rowIndex}
                                            row={rowIndex + 1}
                                            col={colIndex + 1}
                                            onMouseOver={handleHover} />
                                    )
                                }
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className="divHistory">
                    <h2>History</h2>
                    <ul>
                        {hoverHistory.map(({ row, col }, index) => (
                            <li key={index}> col:{col} row:{row}</li>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Board;