import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, BrainCircuit, Library, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

const BooksSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}
    >
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}>
            <Library size={32} />
          </div>
        </div>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>
          A Base <span style={{ color: 'var(--accent-primary)' }}>Teórica</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Todo algoritmo poderoso precisa de uma fonte humana de genialidade. Nossas análises não são inventadas; elas são extraídas das obras mais consagradas do mercado brasileiro.
        </p>
      </motion.div>

      {/* Book 1 - Debastiani */}
      <motion.div variants={itemVariants} style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(56, 189, 248, 0.05) 100%)',
        borderRadius: '24px', padding: '2.5rem', marginBottom: '2.5rem', border: '1px solid var(--glass-border)'
      }}>
        <BookOpen size={250} color="var(--accent-secondary)" style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.04, transform: 'rotate(-15deg)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 100%)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <BookOpen size={36} color="var(--accent-secondary)" />
            </div>
            <div>
              <p style={{ color: 'var(--accent-secondary)', fontSize: '0.95rem', margin: '0 0 0.25rem 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Carlos Alberto Debastiani</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#fff', lineHeight: '1.2', maxWidth: '500px' }}>Candlestick: Um Método Para Ampliar Lucros na Bolsa</h3>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem', maxWidth: '700px' }}>
            A "Bíblia" dos gráficos de velas no Brasil. É através dessa obra que nossa IA compreende a <strong>psicologia do mercado</strong>, decifrando a batalha diária entre touros (compradores) e ursos (vendedores).
          </p>

          <a
            href="https://osaberdigital.com.br/wp-content/uploads/2024/11/Candlestick_-Um-metodo-para-amp-Carlos-Alberto-Debastiani.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-secondary)',
              padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none',
              fontWeight: '600', fontSize: '0.9rem', marginBottom: '2rem',
              border: '1px solid rgba(56, 189, 248, 0.2)', transition: 'all 0.2s ease'
            }}
          >
            <ExternalLink size={16} /> Link para Donwload
          </a>

          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--accent-secondary)" /> O que a IA extrai desta obra:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>1. Padrões de Reversão</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>Rastreio cirúrgico de Engolfos, Martelos e Estrelas utilizando proporção milimétrica de corpo e sombra.</span>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>2. Psicologia do 'Doji'</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>Identificação de equilíbrios de poder e indecisão, prevenindo que você faça entradas precipitadas.</span>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>3. Força da Tendência</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>Classificação do 'Marubozu' para confirmar agressividade e intenção real do player dominante.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Book 2 - Flávio Lemos */}
      <motion.div variants={itemVariants} style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(16, 185, 129, 0.05) 100%)',
        borderRadius: '24px', padding: '2.5rem', marginBottom: '4rem', border: '1px solid var(--glass-border)'
      }}>
        <BookOpen size={250} color="var(--accent-primary)" style={{ position: 'absolute', top: '-50px', right: '-50px', opacity: 0.04, transform: 'rotate(-15deg)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 100%)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <BookOpen size={36} color="var(--accent-primary)" />
            </div>
            <div>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', margin: '0 0 0.25rem 0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Flávio Lemos</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#fff', lineHeight: '1.2', maxWidth: '500px' }}>Análise Técnica dos Mercados Financeiros</h3>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem', maxWidth: '700px' }}>
            O guia definitivo do comportamento das massas. O sistema utiliza os conceitos macro desta obra para validar ou anular padrões de curto prazo, evitando "armadilhas" (bull/bear traps).
          </p>

          <a
            href="https://d1wqtxts1xzle7.cloudfront.net/58785318/Analise_Tecnica_dos_Mercados_Financeiros20190403-107177-11x1vbx.pdf?1738382267=&response-content-disposition=attachment%3B+filename%3DAnalise_Tecnica_dos_Mercados_Financeiros.pdf&Expires=1772718038&Signature=Oojxpx7uYD9ALqSbbeGdVnGY2g-8mXwcG1HLU-plbagw1ygTZh6708EKrwB91ufDQgw~0mtFUiSsw1sAgl5tv3XuXlVThosoW8VzYC1IuvpQkEFwtNDp2rd2O5uOgwkW8FfSDM4dqrf-EAPeAFpRbFqsDepcGuAjsyYKdKppB4zoz5m~SupOOGXupPqc~SjgZxe3AjwzyH2nxEI7dFPi2IqfLV9Wmr-fJzzI5Z6YwwuKdJokV6nCPKoIJmyEgfCQw0lAXTW0TGPTWtJiJWekKFbWWvMg6RQAbf29E48iFBQegnBUXfelatzj40VZKNDS2zdYhpm5dKtBo25cf52QIQ__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)',
              padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none',
              fontWeight: '600', fontSize: '0.9rem', marginBottom: '2rem',
              border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s ease'
            }}
          >
            <ExternalLink size={16} /> Link para Donwload
          </a>

          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} color="var(--accent-primary)" /> O que a IA extrai desta obra:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>1. Teoria de Dow</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>Mapeamento rigoroso de topos e fundos para atestar em qual fase o ciclo de mercado se encontra.</span>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>2. Suporte & Resistência</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>Limitações de preço baseadas em histórico. A IA não recomenda compras de frente a um 'muro' vendedor.</span>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '0.25rem' }}>3. Análise de Volume</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', display: 'block' }}>A regra fundamental de que o volume deve confirmar a tendência, eliminando achismos e falsos rompimentos.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technique - Distinctly styled list */}
      <motion.div variants={itemVariants}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Síntese <span style={{ color: 'var(--accent-warning)' }}>Analítica</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Como o sistema converte livros em relatórios táticos instantâneos</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-warning)', flexShrink: 0 }}>
              <BrainCircuit size={24} />
            </div>
            <div>
              <strong style={{ color: '#fff', fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>Engenharia de Prompt Avançada</strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5', display: 'block' }}>O modelo recebe um <em>System Prompt</em> inviolável contendo os cenários dos livros. A cada ativo, a IA é forçada a "ler" a situação atual sob a ótica dos autores.</span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-warning)', flexShrink: 0 }}>
              <ChevronRight size={24} />
            </div>
            <div>
              <strong style={{ color: '#fff', fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>Processamento em Lote (Bulk)</strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5', display: 'block' }}>Cruza dezenas de dados financeiros compilados em tempo recorde, entregando uma radiografia técnica simultânea sem sobrecarregar a quota.</span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-warning)', flexShrink: 0 }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <strong style={{ color: '#fff', fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>Controle de Risco Objetivo</strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5', display: 'block' }}>Fornece alavancagem segurada: Stops de perda gerados com base na volatilidade anterior (nunca aleatórios), exigindo rigor técnico de quem opera.</span>
            </div>
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
};

export default BooksSection;
