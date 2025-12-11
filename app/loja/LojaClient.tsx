"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import VehicleCard from '@/app/components/VehicleCard';

type Vehicle = {
  id: string;
  title: string;
  price: number;
  year: number;
  status: string;
  images: string[];
};

export default function LojaClient() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (q) params.set('q', q);

    fetch(`/api/vehicles?${params}`)
      .then((res) => res.json())
      .then((data) => {
        let filtered = data;

        if (minPrice) {
          filtered = filtered.filter((v: Vehicle) => v.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
          filtered = filtered.filter((v: Vehicle) => v.price <= parseFloat(maxPrice));
        }

        setVehicles(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [brand, q, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-bold text-[#1B2A49]">
            Mateus Multimarcas
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-48">
            <div className="card bg-white p-6">
              <h2 className="text-lg font-semibold text-[#1B2A49]">Filtros</h2>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#1B2A49]">Marca</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm"
                >
                  <option value="">Todas</option>
                  <option value="Honda">Honda</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Volkswagen">Volkswagen</option>
                </select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#1B2A49]">Busca</label>
                <input
                  type="text"
                  placeholder="Modelo, ano..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#1B2A49]">Preço Mín.</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[#1B2A49]">Preço Máx.</label>
                <input
                  type="number"
                  placeholder="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm"
                />
              </div>

              <button
                onClick={() => {
                  setBrand('');
                  setQ('');
                  setMinPrice('');
                  setMaxPrice('');
                }}
                className="mt-6 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-[#1B2A49]"
              >
                Limpar filtros
              </button>
            </div>
          </aside>

          {/* Vehicle List */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#1B2A49]">Catálogo de Veículos</h1>
            <p className="mt-2 text-gray-600">Encontre o carro dos seus sonhos</p>

            {loading ? (
              <div className="mt-8 text-center text-gray-500">Carregando...</div>
            ) : vehicles.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((v) => (
                  <VehicleCard
                    key={v.id}
                    id={v.id}
                    title={v.title}
                    price={v.price}
                    image={v.images[0]}
                    year={v.year}
                    status={v.status}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center text-gray-500">Nenhum veículo encontrado com os filtros selecionados</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
