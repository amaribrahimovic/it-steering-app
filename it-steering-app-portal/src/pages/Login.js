// Libraries
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'

// Components
import PrimaryInput from '../components/PrimaryInput'
import PrimaryButton from '../components/PrimaryButton'

const modalStyles = {
    content: {
      top: '5%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#cd0e0e',
      color: "#fff",
      border: 'none'
    },
    overlay: {
      background: 'none'
    }
};

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = async () => {
        if(username === '' || password === ''){
            setIsModalOpen(true)
            setTimeout(()=>setIsModalOpen(false), 3000)
            return;
        }
        try{
            const res = await fetch('http://localhost:3210/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
                credentials: 'include',
            });
            if(res.ok)
                    navigate('/projects');
            else {
                setIsModalOpen(true);
                setTimeout(()=>setIsModalOpen(false), 3000);
            }
        } catch(err){
            console.error(err);
        }
        
    } 
    return (
        <div className='card-login'>
            <h1>Prijava v portal</h1>
            <PrimaryInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Uporabniško ime" id="username" name="username" />
            <PrimaryInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Geslo" id="password" name="password" />
            <div>
                <p>Še nimaš računa?</p>
                <Link to='/register'>Registracija</Link>
            </div>
            <PrimaryButton classNameTmp="primary-btn" onClick={handleLogin}>Prijava</PrimaryButton>

            <Modal isOpen={isModalOpen} style={modalStyles} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false}>
                Nepravilni podatki
            </Modal>
        </div>

    )
}

export default Login