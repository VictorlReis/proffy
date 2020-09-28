import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';
import api from '../../services/api';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return(
        <div id="page-login">
            <div className="container-proffy">
                <img src={logoImg} alt="Proffy"/>
                <h2>Sua plataforma de estudos online.</h2>
            </div>
            <div className="container-login">
                <form>
                <h1>Fazer login</h1>
                    <Input name="email" placeholder="E-mail" onChange={(e) => { setEmail(e.target.value) }} />
                    <Input name="password" placeholder="Senha" onChange={(e) => { setPassword(e.target.value) }} />
                    <div>
                        <input type="checkbox" name="lembrar"/>
                        <label htmlFor="lembrar">Lembrar-me</label>
                        <a href="">Esqueci minha senha</a>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
                <footer>
                    Não tem conta? 
                    É de graça!
                    <a href="">Cadastre-se</a>
                </footer>
            </div>
        </div>
    )
}