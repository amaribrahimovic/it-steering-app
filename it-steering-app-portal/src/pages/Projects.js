import React from 'react'
import PrimaryButton from '../components/PrimaryButton'

const Projects = () => {
  return (
    <>
        <div className="flex-action">
            <h3>IT Steering</h3>
            <PrimaryButton classNameTmp="primary-btn">Prijava projekta</PrimaryButton>
        </div>
        <div class='data-table'>
            <div class='data-table-column'>
                <div class="data-table-row header">
                    <p><b>Naslov projekta</b></p>
                    <p><b>Opis projekta</b></p>
                    <p><b>Poslovni učinek</b></p>
                    <p><b>Rok implementacije</b></p>
                    <p><b>Status</b></p>
                    <p><b></b></p>
                </div>
                <div class="data-table-row">
                    <p>Naslov</p>
                    <p>Opis</p>
                    <p>Učinek...</p>
                    <p>Rok</p>
                    <p>Stauts...</p>
                    <div class="actions">
                        <PrimaryButton classNameTmp="delete-btn">Izbriši</PrimaryButton>
                        <PrimaryButton classNameTmp="update-btn">Uredi</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Projects