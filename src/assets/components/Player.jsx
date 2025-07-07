import { useState } from "react";

export default function Player({name, symbol, isActive, onChangeName}){
    const [newName, setNewName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleClick(){
        setIsEditing(editing => !editing);

        if(isEditing){
            onChangeName(symbol, newName)
        }
    }

    function handleChange(event){
        setNewName(event.target.value);
    }

    let inputContent = <span className='player-name'>{newName}</span>

    if(isEditing){
        inputContent = <input type='text' required value={newName} onChange={handleChange} />
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
            {inputContent}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button  onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
};  