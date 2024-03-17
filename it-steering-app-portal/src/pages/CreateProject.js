// Libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'

// Components
import Header from '../components/Header';
import PrimaryInput from '../components/PrimaryInput';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryTextArea from '../components/PrimaryTextArea';

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

const CreateProject = () => {
    const navigate = useNavigate()
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [businessImpact, setBusinessImpact] = useState('');
    const [dueDate, setDueDate] = useState('2024-03-14');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:3210/user', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
    
                if (res.ok) {
                    const data = await res.json();
                    setUserId(data._id);
                    setUsername(data.username)
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        checkAuth();
    }, []);

    const handleCreateProject = async () => {
        if(projectTitle === '' || projectDesc === '' || businessImpact === '' || dueDate === ''){
            setIsModalOpen(true)
            setTimeout(()=>setIsModalOpen(false), 3000)
            return;
        }
        try{
            const res = await fetch(`http://localhost:3210/projects/${userId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: projectTitle, desc: projectDesc, businessImpact: businessImpact, dueDate: dueDate}),
                credentials: 'include',
            });
            if (res.ok) {
                navigate('/projects');
            } else{
                setIsModalOpen(true)
                setTimeout(()=>setIsModalOpen(false), 3000)
            }
        } catch(err){
            console.error(err);
        }
    } 

    return (
        <>
            <Header username={username}/>
            <div className="card">
                <p>Prijava projekta na IT Steering</p>
                <PrimaryInput value={projectTitle} onChange={e => setProjectTitle(e.target.value)} type="text" placeholder="Naslov projekta" id="project-title" name="project-title" />
                <PrimaryTextArea rows="5" value={projectDesc} onChange={e => setProjectDesc(e.target.value)} placeholder="Opis projekta" id="project-desc" name="project-desc" />
                <PrimaryInput value={businessImpact} onChange={e => setBusinessImpact(e.target.value)} type="text" placeholder="Poslovni učinek" id="business-impact" name="business-impact" />
                <div>
                    <label htmlFor="due-date">Rok implementacije</label>
                    <PrimaryInput value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" id="due-date" name="due-date" />
                </div>

                <PrimaryButton classNameTmp="primary-btn" onClick={handleCreateProject}>Oddaj Prijavo</PrimaryButton>
            </div>

            <Modal isOpen={isModalOpen} style={modalStyles} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false}>
                Nepravilni podatki
            </Modal>
        </>

        
    )
}

export default CreateProject