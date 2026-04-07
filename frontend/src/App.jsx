import React, { useState, useEffect } from 'react';
import { Search, Info, TrendingUp, BarChart3, CreditCard, User, Bell, ChevronLeft, ChevronRight, Share2, MoreVertical, Globe, Calendar, Clock, DollarSign, PieChart, LayoutDashboard, LayoutGrid, List, Filter, RefreshCw, Send, BrainCircuit, Rocket, Zap, BookOpen, ShieldCheck, HelpCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from './components/ResultCard';

const App = () => {
    const [tickers, setTickers] = useState('PETR4, VALE3, BBDC4, MGLU3');
    const [tradeType, setTradeType] = useState('swing');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tickers, trade_type: tradeType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Falha ao conectar com o servidor.');
            }

            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {/* Nav Header */}
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '4rem',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--glass-border)',
                marginTop: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        padding: '0.75rem',
                        borderRadius: '50%',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Rocket size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Trader <span style={{ color: 'var(--accent-primary)' }}>AI</span></h2>
                </div>
                
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Mercado</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Livros</a>
                    <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>IA</a>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} color="var(--accent-primary)" />
                    </div>
                </div>
            </nav>

            {/* Hero & Search */}
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ShieldCheck size={14} /> Sistema Ativo
                    </span>
                    <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Zap size={14} /> Gemini Flash 1.5
                    </span>
                </div>
                <h1>A Análise Técnica <br/> Elevada pela Inteligência</h1>
                <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '1.25rem', 
                    maxWidth: '700px', 
                    margin: '0 auto 3rem',
                    lineHeight: '1.6'
                }}>
                    Obtenha relatórios detalhados com base nos fundamentos de <strong style={{ color: '#fff' }}>Carlos Alberto Debastiani</strong> e <strong style={{ color: '#fff' }}>Flávio Lemos</strong> num piscar de olhos.
                </p>

                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <form onSubmit={handleAnalyze}>
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', paddingLeft: '0.5rem' }}>
                                <Search size={16} /> Insira os TICKERS (separados por vírgula)
                            </label>
                            <input 
                                type="text" 
                                value={tickers} 
                                onChange={(e) => setTickers(e.target.value)}
                                placeholder="ex: PETR4, VALE3, WEGE3"
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
                                <button 
                                    type="button"
                                    onClick={() => setTradeType('swing')}
                                    style={{ 
                                        padding: '0.65rem 1.75rem', 
                                        borderRadius: '10px', 
                                        border: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        backgroundColor: tradeType === 'swing' ? 'var(--bg-tertiary)' : 'transparent',
                                        color: tradeType === 'swing' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Swing Trade
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setTradeType('day')}
                                    style={{ 
                                        padding: '0.65rem 1.75rem', 
                                        borderRadius: '10px', 
                                        border: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        backgroundColor: tradeType === 'day' ? 'var(--bg-tertiary)' : 'transparent',
                                        color: tradeType === 'day' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Day Trade
                                </button>
                            </div>

                            <button className="btn" type="submit" disabled={loading} style={{ 
                                padding: '1rem 3rem',
                                fontSize: '1rem',
                                minWidth: '220px',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}>
                                {loading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                          <RefreshCw className="animate-spin" size={20} style={{ animation: 'spin 2s linear infinite' }} />
                                          <span>Analisando em lote...</span>
                                        </div>
                                        <span style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: '400' }}>Processando quota da IA (pode levar 10-30s)</span>
                                    </div>
                                ) : (
                                    <>
                                        <BrainCircuit size={20} />
                                        <span>Analisar Agora</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.header>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card" 
                        style={{ border: '1px solid var(--accent-danger)', backgroundColor: 'rgba(239, 68, 68, 0.05)', marginBottom: '3rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-danger)' }}>
                            <AlertCircle size={24} />
                            <div>
                                <h4 style={{ margin: 0 }}>Ocorreu um erro</h4>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Section */}
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {results.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                       <BarChart3 size={28} color="var(--accent-primary)" /> Resultados da Análise
                    </h2>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{results.length} ativos processados</span>
                  </div>
                )}
                
                {results.map((res, idx) => (
                    <ResultCard key={idx} result={res} />
                ))}

                {/* Empty State */}
                {!loading && results.length === 0 && !error && (
                  <div style={{ textAlign: 'center', padding: '5rem 0', opacity: 0.4 }}>
                    <BookOpen size={48} style={{ marginBottom: '1.5rem' }} />
                    <h3>Nenhum resultado para mostrar</h3>
                    <p>Insira alguns símbolos de ações acima para começar a sua análise profissional.</p>
                  </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin { animation: spin 2s linear infinite; }
            `}</style>

            <footer style={{ 
              textAlign: 'center', 
              marginTop: '8rem', 
              padding: '3rem 0', 
              borderTop: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem'
            }}>
              <p>&copy; 2026 Trader AI - Baseado em Teoria de Candlesticks Profissional</p>
            </footer>
        </div>
    );
};

export default App;
