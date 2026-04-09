import React from 'react';
import { motion } from 'framer-motion';
import { Server, BrainCircuit, Activity, LineChart, Code2, Cpu } from 'lucide-react';

const AiSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '5rem' }}
    >
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #fff, var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          A Anatomia da <span style={{ color: 'var(--accent-primary)', WebkitTextFillColor: 'var(--accent-primary)' }}>Decisão</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Entenda a jornada dos dados. Sem "caixas pretas" ou magia: apenas engenharia matemática pura combinada com interpretação de linguagem de alto nível.
        </p>
      </motion.div>

      <div style={{ position: 'relative' }}>
        {/* Vertical Line Connector */}
        <div style={{ 
          position: 'absolute', 
          left: '28px', 
          top: '30px', 
          bottom: '30px', 
          width: '2px', 
          background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.4), rgba(16, 185, 129, 0.4))',
          zIndex: 0
        }} />

        {/* Step 1: The Engine */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-secondary)', 
            border: '2px solid rgba(56, 189, 248, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)', flexShrink: 0
          }}>
            <Server size={26} color="var(--accent-secondary)" />
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff' }}>1. O Motor Matemático</h2>
            <h3 style={{ color: 'var(--accent-secondary)', fontSize: '1rem', fontWeight: '500', margin: '0.25rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>O Backend (O Sistema)</h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Nosso sistema atua como o alicerce rigoroso da operação. O backend não toma decisões; ele extrai, limpa e calcula a realidade do mercado. Ele consome dados diretos da B3 e aplica a matemática exigida pelos autores base.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Activity size={20} color="var(--accent-secondary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Captura Bruta</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>Sincronização em tempo real de OHLVC (Abertura, Máxima, Mínima, Fechamento e Volume).</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Code2 size={20} color="var(--accent-secondary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Proporção Exata</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>Cálculos das sombras vs tamanho do candle para validar viabilidade de padrões antes da IA.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 2: The Intellect */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-secondary)', 
            border: '2px solid rgba(16, 185, 129, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)', flexShrink: 0
          }}>
            <BrainCircuit size={28} color="var(--accent-primary)" />
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: '#fff' }}>2. A Inteligência de Contexto</h2>
            <h3 style={{ color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: '500', margin: '0.25rem 0 1.5rem 0', textTransform: 'uppercase', letterSpacing: '1px' }}>O Modelo Generativo (IA)</h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              A Inteligência Artificial atua estritamente como um <strong>Intérprete Técnico</strong>. Ela recebe a realidade processada pelo Backend e tem a missão de cruzar esses resultados com a biblioteca de conhecimento de Análise Técnica (a base de Flávio Lemos e Debastiani). Ela não "adivinha" o futuro.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Cpu size={20} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Diagnóstico Visual</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>Transforma os dados puros (onde uma sombra inferior é 2x maior que o corpo) no diagnóstico final de um "Martelo".</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <LineChart size={20} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Tradução ao Humano</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>Emite relatórios traduzindo números brutos em estratégias claras de entrada, proteção (stop) e alvo.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default AiSection;
