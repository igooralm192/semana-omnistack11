import React, { useState } from 'react'

import './styles.css'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident() {
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(0)

    async function handleNewIncident(e) {
        e.preventDefault()

        const data = { title, description, value }

        try {
            await api.post('/incidents', data)

            alert('Caso cadastrado com sucesso!')
            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    } 

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color='#E02041'/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder='Título' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='Descrição' 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type='number' 
                        placeholder='Valor em reais' 
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}