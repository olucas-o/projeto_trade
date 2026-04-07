import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Info, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultCard = ({ result }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (result.error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card" 
        style={{ borderColor: 'var(--accent-danger)', marginBottom: '1.5rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-danger)' }}>
          <AlertCircle size={24} />
          <div>
            <h3 style={{ margin: 0 }}>Erro em {result.ticker || 'Ticker Desconhecido'}</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{result.error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const getConfidenceLevel = (text) => {
    if (text.toLowerCase().includes('alta')) return 'Alta';
    if (text.toLowerCase().includes('média')) return 'Média';
    return 'Baixa';
  };

  const parseStopMovelData = (text) => {
    const regex = /\[\[STOP_MOVEL_DATA\]\]([\s\S]*?)\[\[END_STOP_MOVEL_DATA\]\]/;
    const match = text.match(regex);
    if (!match) return null;

    const dataLines = match[1].trim().split('\n');
    const fields = {};
    dataLines.forEach(line => {
      const splitIndex = line.indexOf(':');
      if (splitIndex !== -1) {
        const key = line.substring(0, splitIndex).trim();
        const value = line.substring(splitIndex + 1).trim();
        fields[key] = value;
      }
    });
    return fields;
  };

  const cleanAnalysisText = (text) => {
    return text.replace(/\[\[STOP_MOVEL_DATA\]\]([\s\S]*?)\[\[END_STOP_MOVEL_DATA\]\]/, '').trim();
  };

  const stopMovel = parseStopMovelData(result.analise);
  const cleanText = cleanAnalysisText(result.analise);
  const confidence = getConfidenceLevel(result.analise);
  const badgeClass = confidence === 'Alta' ? 'badge-success' : confidence === 'Média' ? 'badge-warning' : 'badge-danger';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="card" 
      style={{ marginBottom: '1.5rem', overflow: 'hidden' }}
    >
      <div 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            padding: '0.75rem',
            borderRadius: '12px',
            color: 'white'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{result.ticker}</h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', alignItems: 'center' }}>
              <span className={`badge ${badgeClass}`}>Confiança {confidence}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>R$ {result.fecho.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          {isOpen ? <ChevronUp size={24} color="var(--text-secondary)" /> : <ChevronDown size={24} color="var(--text-secondary)" />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Info size={18} /> Análise da IA
                </h4>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  lineHeight: '1.6', 
                  fontSize: '1rem',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  marginBottom: '1.5rem'
                }}>
                  {cleanText}
                </div>
              </div>

              {stopMovel && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CreditCard size={18} /> Aba Stop Móvel (Campos para Preencher)
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '1rem',
                    background: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                  }}>
                    {Object.entries(stopMovel).map(([key, value]) => (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>{key}</span>
                        <div style={{ 
                          background: 'var(--bg-secondary)', 
                          padding: '0.75rem', 
                          borderRadius: '8px', 
                          border: '1px solid var(--glass-border)',
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: '0.95rem'
                        }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Padrão Matemático</p>
                  <p style={{ fontWeight: '600', fontSize: '1rem' }}>{result.padrao}</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Volume</p>
                  <p style={{ fontWeight: '600', fontSize: '1rem' }}>{result.volume.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultCard;
