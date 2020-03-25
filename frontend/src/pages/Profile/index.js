import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {
    const history = useHistory()
    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be The Hero'/>
                <span>Bem vinda, {ongName}</span>
                
                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color='#E02041'/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(({ id, title, description, value }, i) => (
                        <li key={id}>
                            <strong>CASO</strong>
                            <p>{title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}</p>

                            <button type='button' onClick={() => handleDeleteIncident(id)}>
                                <FiTrash2 size={20} color='#a8a8b3'/>
                            </button>
                        </li>
                    ))
                } 
            </ul>
        </div>
    );
}
