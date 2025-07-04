import { useState } from "react";

export default function Player({name, symbol}){
    const [newName, setNewName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);
    function handleClick(){
        setIsEditing(editing => !editing);
        
    }

    function handleChange(event){
        setNewName(event.target.value);
    }

    let inputContent = <span className='player-name'>{newName}</span>

    if(isEditing){
        inputContent = <input type='text' required value={newName} onChange={handleChange} />
    }
    return (
        <>
            <span className="player">
            {inputContent}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button  onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </>
    );
};  