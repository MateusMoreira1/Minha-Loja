'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === 'mateus2025') {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminPassword', password);
      router.push('/admin/dashboard');
    } else {
      setError('Senha incorreta');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B2A49] to-[#0F172A]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#1B2A49]">Painel Admin</h1>
          <p className="mt-2 text-sm text-gray-600">Mateus Multimarcas</p>

          <form onSubmit={handleLogin} className="mt-6">
            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Digite a senha"
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-[#00FFFF] px-4 py-3 font-semibold text-[#072227]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
