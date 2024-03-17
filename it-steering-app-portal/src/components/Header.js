import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import PrimaryButton from './PrimaryButton';

const Header = ({username}) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try{
            const res = await fetch('http://localhost:3210/logout', {
                method: "GET",
                headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
    
            if (res.ok) {
                navigate('/');
            }
        } catch(err){
            console.error(err);
        }       
    }

    return (
        <>
            <header>
                <p>Prijavljeni ste kot {username}</p>
                <PrimaryButton classNameTmp="secondary-btn" onClick={handleLogout}>Odjava</PrimaryButton>
            </header>
        </>
        
    )
}

export default Header