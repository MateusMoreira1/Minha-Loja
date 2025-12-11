'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Vehicle = {
  id: string;
  title: string;
  price: number;
  year: number;
  status: string;
  mileage: number;
};

export default function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    setIsAuthed(true);
    loadVehicles();
  }, [router]);

  async function loadVehicles() {
    const response = await fetch('/api/vehicles');
    const data = await response.json();
    setVehicles(data);
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminPassword');
    router.push('/admin');
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-lg font-bold text-[#1B2A49]">Admin - Mateus Multimarcas</h1>
          <div className="flex gap-4">
            <Link href="/admin/perfil" className="rounded-lg border border-gray-200 px-4 py-2 font-semibold text-[#1B2A49]">
              ⚙️ Meu Perfil
            </Link>
            <Link href="/admin/novo" className="rounded-lg bg-[#00FFFF] px-4 py-2 font-semibold text-[#072227]">
              + Novo Veículo
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-4 py-2 font-semibold text-[#1B2A49]"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h2 className="text-2xl font-bold text-[#1B2A49]">Gestão de Estoque</h2>

        {loading ? (
          <div className="mt-8 text-center text-gray-500">Carregando...</div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg bg-white shadow-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1B2A49]">Veículo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1B2A49]">Preço</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1B2A49]">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1B2A49]">Km</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#1B2A49]">Ações</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-[#1B2A49]">{v.title}</td>
                    <td className="px-6 py-4 text-sm text-[#1B2A49]">R$ {v.price.toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="badge">{v.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{v.mileage.toLocaleString('pt-BR')} km</td>
                    <td className="px-6 py-4 text-sm">
                      <Link href={`/admin/editar/${v.id}`} className="text-[#00FFFF] hover:underline">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
