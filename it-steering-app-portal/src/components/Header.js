import React from 'react'

// Components
import PrimaryButton from './PrimaryButton';

const Header = () => {


    const handleLogout = () => {
        console.log("Logged out");
    }

    return (
        <header>
            <p>Prijavljeni ste kot Uporabnik</p>
            <PrimaryButton classNameTmp="secondary-btn" onClick={handleLogout}>Odjava</PrimaryButton>
        </header>
    )
}

export default Header