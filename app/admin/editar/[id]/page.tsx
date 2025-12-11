'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Vehicle = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  status: string;
  condition: string;
  description: string;
  specs: Record<string, any>;
  images: string[];
};

export default function EditVehicle({ params }: { params: { id: string } }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
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
    loadVehicle();
  }, [router, params.id]);

  async function loadVehicle() {
    const response = await fetch(`/api/vehicles/${params.id}`);
    const data = await response.json();
    setVehicle(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!vehicle) return;

    setSaving(true);
    const password = localStorage.getItem('adminPassword');

    const response = await fetch(`/api/admin/vehicles/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password || '',
      },
      body: JSON.stringify(vehicle),
    });

    if (response.ok) {
      alert('Veículo atualizado com sucesso!');
      router.push('/admin/dashboard');
    } else {
      alert('Erro ao salvar');
    }
    setSaving(false);
  }

  if (!isAuthed || loading) {
    return null;
  }

  if (!vehicle) {
    return <div className="text-center py-8">Veículo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-lg font-bold text-[#1B2A49]">Editar Veículo</h1>
          <Link href="/admin/dashboard" className="text-gray-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container py-8 max-w-2xl">
        <form onSubmit={handleSave} className="bg-white card p-8">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Título</label>
              <input
                type="text"
                value={vehicle.title}
                onChange={(e) => setVehicle({ ...vehicle, title: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Marca</label>
                <input
                  type="text"
                  value={vehicle.brand}
                  onChange={(e) => setVehicle({ ...vehicle, brand: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Modelo</label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Ano</label>
                <input
                  type="number"
                  value={vehicle.year}
                  onChange={(e) => setVehicle({ ...vehicle, year: parseInt(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Preço</label>
                <input
                  type="number"
                  value={vehicle.price}
                  onChange={(e) => setVehicle({ ...vehicle, price: parseFloat(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Km</label>
                <input
                  type="number"
                  value={vehicle.mileage}
                  onChange={(e) => setVehicle({ ...vehicle, mileage: parseFloat(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Status</label>
                <select
                  value={vehicle.status}
                  onChange={(e) => setVehicle({ ...vehicle, status: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Em Negociação">Em Negociação</option>
                  <option value="Vendido">Vendido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1B2A49]">Condição</label>
                <select
                  value={vehicle.condition}
                  onChange={(e) => setVehicle({ ...vehicle, condition: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-3"
                >
                  <option value="Novo">Novo</option>
                  <option value="Seminovo">Seminovo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1B2A49]">Descrição</label>
              <textarea
                value={vehicle.description}
                onChange={(e) => setVehicle({ ...vehicle, description: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-200 p-3"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-[#00FFFF] px-4 py-3 font-semibold text-[#072227]"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <Link href="/admin/dashboard" className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-center font-semibold text-[#1B2A49]">
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
