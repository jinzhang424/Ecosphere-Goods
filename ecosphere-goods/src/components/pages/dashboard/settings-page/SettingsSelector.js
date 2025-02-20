import React, { useState } from 'react'
import ToggleButton from '../../../utility/general-buttons/ToggleButton/ToggleButton';
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiTruckFill } from "react-icons/ri";

const SettingsSelector = () => {
    const [selected, setSelected] = useState('basic-info');

    return (
        <div className='flex'>
            <ToggleButton selected={selected} id="basic-info" onClick={setSelected}>
                <IoPersonCircleSharp size={24}/>Account
            </ToggleButton>
            <ToggleButton selected={selected} id="delivery-info" onClick={setSelected}>
                <RiTruckFill size={24}/>Delivery Info
            </ToggleButton>
        </div>
    )
}

export default SettingsSelector
