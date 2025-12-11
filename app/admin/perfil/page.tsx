'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AdminConfig = {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  about: string;
  businessHours: string;
};

export default function AdminProfile() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthed(true);
    loadConfig();
  }, [router]);

  async function loadConfig() {
    const response = await fetch('/api/admin/config');
    const data = await response.json();
    setConfig(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    const password = localStorage.getItem('adminPassword');

    const response = await fetch('/api/admin/config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password || '',
      },
      body: JSON.stringify(config),
    });

    if (response.ok) {
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Erro ao salvar');
    }
    setSaving(false);
  }

  if (!isAuthed || loading) {
    return null;
  }

  if (!config) {
    return <div className="text-center py-8">Configuração não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-lg font-bold text-[#1B2A49]">Meu Perfil</h1>
          <Link href="/admin/dashboard" className="text-gray-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-2xl">
        <form onSubmit={handleSave} className="bg-white card p-8">
          <div className="grid gap-6">
            {/* Foto de Perfil */}
            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Foto de Perfil (URL)</label>
              <p className="mt-1 text-xs text-gray-500">Exemplo: /admin-profile.jpg ou https://exemplo.com/foto.jpg</p>
              <input
                type="text"
                value={config.profileImage}
                onChange={(e) => setConfig({ ...config, profileImage: e.target.value })}
                placeholder="/admin-profile.jpg"
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
              {config.profileImage && (
                <div className="mt-3">
                  <img 
                    src={config.profileImage} 
                    alt="Preview" 
                    className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                    onError={() => console.log('Erro ao carregar imagem')}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Nome</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Telefone</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Email</label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Sobre mim</label>
              <textarea
                value={config.about}
                onChange={(e) => setConfig({ ...config, about: e.target.value })}
                rows={3}
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Horários de Funcionamento</label>
              <input
                type="text"
                value={config.businessHours}
                onChange={(e) => setConfig({ ...config, businessHours: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-[#00FFFF] px-4 py-3 font-semibold text-[#072227]"
              >
                {saving ? 'Salvando...' : 'Salvar Perfil'}
              </button>
              <Link href="/admin/dashboard" className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-center font-semibold text-[#1B2A49]">
                Cancelar
              </Link>
            </div>
          </div>
        </form>

        {/* Instruções */}
        <div className="mt-8 bg-white card p-6">
          <h2 className="font-semibold text-[#1B2A49]">📸 Como adicionar sua foto de perfil</h2>
          <div className="mt-4 text-sm text-gray-600 space-y-3">
            <p>
              <strong>Opção 1 - Local (recomendado):</strong>
              <br/>
              1. Salve sua foto como <code className="bg-gray-100 px-2 py-1 rounded">admin-profile.jpg</code> na pasta <code className="bg-gray-100 px-2 py-1 rounded">public/</code>
              <br/>
              2. No campo "Foto de Perfil", digite: <code className="bg-gray-100 px-2 py-1 rounded">/admin-profile.jpg</code>
            </p>
            <p>
              <strong>Opção 2 - URL externa:</strong>
              <br/>
              Cole a URL completa de uma imagem (ex: https://exemplo.com/minha-foto.jpg)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
