'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [brand, setBrand] = useState('');
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (brand) params.set('brand', brand);
    const query = params.toString();
    router.push(`/loja${query ? `?${query}` : ''}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          aria-label="Buscar veículos"
          placeholder="Marca, modelo ou ano..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-gray-300 backdrop-blur-sm transition focus:border-[#00FFFF] focus:bg-white/20"
        />

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-3.5 text-white backdrop-blur-sm transition focus:border-[#00FFFF] focus:bg-white/20"
          aria-label="Filtrar por marca"
        >
          <option value="" className="bg-[#1B2A49] text-white">Todas marcas</option>
          <option value="Honda" className="bg-[#1B2A49] text-white">Honda</option>
          <option value="Toyota" className="bg-[#1B2A49] text-white">Toyota</option>
          <option value="Volkswagen" className="bg-[#1B2A49] text-white">Volkswagen</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-[#00FFFF] px-6 py-3.5 font-semibold text-[#072227] transition hover:bg-white hover:shadow-lg"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
