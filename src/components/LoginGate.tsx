import React, { useState } from 'react';
import { motion } from 'motion/react';
import InstitutionalLogo from './InstitutionalLogo';
import { ShieldCheck, ChevronRight, Loader2, ShieldHalf, Focus } from 'lucide-react';

interface LoginGateProps {
  onLogin: (code: string) => void;
}

export default function LoginGate({ onLogin }: LoginGateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      // For now, accept VX-01 to VX-13
      const validPattern = /^VX-(0[1-9]|1[0-3])$/i;
      if (validPattern.test(code.trim().toUpperCase()) || code === 'DEMO') {
        onLogin(code.trim().toUpperCase());
      } else {
        setError('Código inválido. Verifique su credencial de Alumno.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vortex-dark p-6 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-8"
          >
            <InstitutionalLogo className="w-full h-full" />
          </motion.div>
          <h1 className="text-4xl font-serif italic text-white tracking-wider mb-2">LOS HÉROES DE ÑUBLE</h1>
          <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px]">Preuniversitario // Sistema de Preparación</p>
        </div>

        <div className="vortex-card p-10 bg-vortex-surface/50 backdrop-blur-xl border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="code" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">
                Identificación de Alumno
              </label>
              <input
                id="code"
                type="text"
                placeholder="VX-00"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                className="vortex-input w-full text-center text-3xl tracking-[0.4em] py-5 uppercase border-slate-800 bg-[#05070a]/50 font-serif italic"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-amber-500 text-[10px] uppercase tracking-widest text-center font-bold"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="vortex-button-primary w-full py-4 relative group overflow-hidden"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                <span className="relative z-10">Iniciar Secuencia // Entrar</span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
            <p className="text-[10px] text-slate-600 font-mono italic">
              #Disciplina #Excelencia #Admisión2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
