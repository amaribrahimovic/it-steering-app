import React, { useState } from 'react'

// Components
import Header from '../components/Header';
import PrimaryInput from '../components/PrimaryInput';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryTextArea from '../components/PrimaryTextArea';

const CreateProject = () => {

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [businessImpact, setBusinessImpact] = useState('');
    const [dueDate, setDueDate] = useState('2024-03-14');

    const handleCreateProject = () => {
        console.log(projectTitle);
        console.log(projectDesc);
        console.log(businessImpact);
        console.log(dueDate);
    } 

    return (
        <>
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
        </>
    )
}

export default CreateProject