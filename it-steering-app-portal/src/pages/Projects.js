// Libraries
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

// Components
import Header from '../components/Header'
import PrimaryButton from '../components/PrimaryButton'

const modalStyles = {
    content: {
      top: '5%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#363636',
      color: "#fff",
      border: 'none'
    },
    overlay: {
      background: 'none'
    }
};

const Projects = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userProjects, setUserProjects] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusClassName = (status) => {
        switch (status) {
            case 'V presoji':
                return 'status-pending';
            case 'V izvedbi':
                return 'status-in-progress';
            case 'Na čakanju':
                return 'status-on-hold';
            case 'Zaključeno':
                return 'status-completed';
            default:
                return '';
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

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
                    setUsername(data.username);
                    setIsAdmin(data.admin);

                    if (data.admin) {
                        const projects = await fetch(`http://localhost:3210/projects`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        });

                        if (projects.ok) {
                            const data = await projects.json();
                            setUserProjects(data);
                        }
                    } else{
                        const projects = await fetch(`http://localhost:3210/user/projects/${data._id}`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            credentials: 'include',
                        });

                        if (projects.ok) {
                            const data = await projects.json();
                            setUserProjects(data);
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        checkAuth();
    }, []);

    useEffect(() => {
        const defaultStatuses = {};
        userProjects.forEach(project => {
            defaultStatuses[project._id] = project.status;
        });
        setSelectedStatuses(defaultStatuses);
    }, [userProjects]);

    const updateProject = async project => {
        try{
            project.status = selectedStatuses[project._id];
            const res = await fetch('http://localhost:3210/projects', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
                credentials: 'include',
            });

            if (res.ok) 
                openModal()
                setTimeout(()=>{closeModal()}, 3000);
        } catch(err){
            console.error(err);
        }
    }

    const deleteProject = async project => {
        try{
            const res = await fetch(`http://localhost:3210/projects/${project._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (res.ok)
                setUserProjects((prevProjects) => prevProjects.filter((prevProject) => prevProject._id !== project._id));
        } catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <Header username={username}/>
            <div className="flex-action">
                <h3>IT Steering</h3>
                <Link to='/createproject'><PrimaryButton classNameTmp="primary-btn">Prijava projekta</PrimaryButton></Link>
            </div>
            <div className="data-table-wrapper">
                <div className='data-table'>
                    <div className='data-table-column'>
                        <div className="data-table-row header">
                            <p><b>Naslov projekta</b></p>
                            <p><b>Opis projekta</b></p>
                            <p><b>Poslovni učinek</b></p>
                            <p><b>Rok implementacije</b></p>
                            <p><b>Status</b></p>
                            {isAdmin ? (<p></p>) : null}
                        </div>
                        {userProjects.map(project=>(
                            <div key={project._id} className="data-table-row">
                                <p>{project.title}</p>
                                <p>{project.desc}</p>
                                <p>{project.businessImpact}</p>
                                <p>{project.dueDate}</p>
                                {isAdmin ?
                                    (
                                        <>
                                            <p>
                                            <select value={selectedStatuses[project._id] || 'V presoji'}
                                                onChange={e => {
                                                    setSelectedStatuses({
                                                        ...selectedStatuses,
                                                        [project._id]: e.target.value
                                                    });
                                                }}
                                                className={getStatusClassName(selectedStatuses[project._id])}
                                            >
                                                <option value="V presoji" className='status-pending'>V presoji</option>
                                                <option value="V izvedbi" className='status-in-progress'>V izvedbi</option>
                                                <option value="Na čakanju" className='status-on-hold'>Na čakanju</option>
                                                <option value="Zaključeno" className='status-completed'>Zaključeno</option>
                                            </select>
                                            </p>
                                            <div className="actions">
                                                <PrimaryButton classNameTmp="delete-btn" onClick={() => deleteProject(project)}>Izbriši</PrimaryButton>
                                                <PrimaryButton classNameTmp="update-btn" onClick={() => updateProject(project)}>Uredi</PrimaryButton>
                                            </div>
                                        </> ) : (<p className={getStatusClassName(project.status)}>{project.status}</p>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyles} shouldCloseOnOverlayClick={true} ariaHideApp={false}>
                Status projekta posodobljen
            </Modal>
        </>
    )
}

export default Projects