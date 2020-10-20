import React, { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Input from '../../components/Input';
import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {Login} =  useAuth();
  
    function handleLogin(e: FormEvent) {
        e.preventDefault();
        console.log(email);
        Login(email, password);
    }

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
                    <Input name="password" type="password" placeholder="Senha" onChange={(e) => { setPassword(e.target.value) }} />
                    <div>
                        <input type="checkbox" name="lembrar"/>
                        <label htmlFor="lembrar">Lembrar-me</label>
                        <a href="">Esqueci minha senha</a>
                    </div>
                    <button onClick={handleLogin}>Entrar</button>
                </form>
                <footer>
                    Não tem conta? 
                    <span>É de graça!<img src={purpleHeartIcon} alt="PurpleHeart"/></span>
                    <a href="">Cadastre-se</a>
                </footer>
            </div>
        </div>
    )
}