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

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const res = await fetch('http://localhost:3210/user', {
    //                 method: "GET",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 credentials: 'include',
    //             });
    //             if (res.ok)
    //                 navigate('/projects');
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    
    //     checkAuth();
    // }, []);

    const handleRegister = async () => {
        if(username === '' || password === '' || repeatPassword === ''){
            setIsModalOpen(true)
            setTimeout(()=>setIsModalOpen(false), 3000)
            return;
        }
        try{
            if (password === repeatPassword) {
                const res = await fetch('http://localhost:3210/signup', {
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
                    setIsModalOpen(true)
                    setTimeout(()=>setIsModalOpen(false), 3000)
                }
            } else{
                setIsModalOpen(true)
                setTimeout(()=>setIsModalOpen(false), 3000)
            }
        } catch(err){
            console.error(err);
        }
    } 
    return (
        <div className='card-login'>
            <h1>Registracija</h1>
            <PrimaryInput value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Uporabniško ime" id="username" name="username" />
            <PrimaryInput value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Geslo" id="password" name="password" />
            <PrimaryInput value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" placeholder="Ponovi geslo" id="repeat-password" name="repeat-password" />
            <div>
                <p>Že imaš račun?</p>
                <Link to='/'>Prijava</Link>
            </div>
            <PrimaryButton classNameTmp="primary-btn" onClick={handleRegister}>Registracija</PrimaryButton>

            <Modal isOpen={isModalOpen} style={modalStyles} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false}>
                Nepravilni podatki
            </Modal>
        </div>
    )
}

export default Register