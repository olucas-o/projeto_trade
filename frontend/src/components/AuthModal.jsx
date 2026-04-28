import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, X, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const { signIn, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
                onClose();
            } else {
                if (password !== confirmPassword) {
                    throw new Error('As senhas não coincidem. Por favor, digite senhas iguais.');
                }
                const { error, data } = await signUp(email, password, name);
                if (error) throw error;
                setMsg('Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta antes de fazer login (verifique também o seu spam).');
                setIsLogin(true);
            }
        } catch (err) {
            let errorMessage = 'Ocorreu um erro na autenticação.';
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                errorMessage = 'E-mail ou senha incorretos.';
            } else if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'Este e-mail já está em uso.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'A senha é muito fraca (mínimo 6 caracteres).';
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            if (errorMessage.includes('auth/')) {
                 errorMessage = 'Erro de autenticação. Verifique os dados inseridos.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', 
        boxSizing: 'border-box',
        padding: '0.85rem 1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'all 0.3s ease'
    };

    const labelStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ width: '100%', maxWidth: '400px', position: 'relative', background: 'var(--bg-primary)' }}
            >
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem' }}>
                    {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Para realizar análises ilimitadas, você precisa de uma conta verificada.
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {msg && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!isLogin && (
                        <div>
                            <label style={labelStyle}>
                                <User size={16} /> Nome Completo
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={inputStyle}
                                placeholder="Seu nome"
                            />
                        </div>
                    )}

                    <div>
                        <label style={labelStyle}>
                            <Mail size={16} /> E-mail
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>
                            <Lock size={16} /> Senha
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                            placeholder="••••••••"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label style={labelStyle}>
                                <Lock size={16} /> Confirmar Senha
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={inputStyle}
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', 
                            color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 'bold', 
                            cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem', opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Aguarde...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button 
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(''); setMsg(''); setName(''); setConfirmPassword(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-secondary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
                    >
                        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
