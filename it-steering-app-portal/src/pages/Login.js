import React, { useState } from 'react'

// Components
import PrimaryInput from '../components/PrimaryInput'
import PrimaryButton from '../components/PrimaryButton'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("neki");
        console.log(username);
        console.log(password);
    } 
    return (
        <div>
            <h1>Prijava v portal</h1>
            <PrimaryInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Uporabniško ime" id="username" name="username" />
            <PrimaryInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Geslo" id="password" name="password" />
            <PrimaryButton onClick={handleLogin}>Prijava</PrimaryButton>
        </div>
    )
}

export default Login