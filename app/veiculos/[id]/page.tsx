'use client';

import { useState, useEffect } from 'react';
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

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/vehicles/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1B2A49]">Veículo não encontrado</h1>
          <Link href="/loja" className="mt-4 inline-block text-[#00FFFF]">
            Voltar para loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-bold text-[#1B2A49]">
            Mateus Multimarcas
          </Link>
          <Link href="/loja" className="text-sm text-gray-600 hover:underline">
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="card overflow-hidden bg-white">
              <div className="relative h-96 w-full bg-gray-100">
                <img
                  src={vehicle.images[activeImageIndex] || '/placeholder.jpg'}
                  alt={vehicle.title}
                  className="h-full w-full object-cover"
                />
                {vehicle.status === 'Vendido' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-2xl font-bold">VENDIDO</div>
                  </div>
                )}
              </div>

              {vehicle.images.length > 1 && (
                <div className="flex gap-2 p-4 bg-white">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-20 w-20 rounded-lg border-2 overflow-hidden ${
                        idx === activeImageIndex ? 'border-[#00FFFF]' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${vehicle.title} - ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-[#1B2A49]">{vehicle.title}</h1>
            <p className="mt-2 text-lg text-[#00FFFF] font-semibold">R$ {vehicle.price.toLocaleString('pt-BR')}</p>
            <div className="mt-4 flex gap-3">
              <span className="badge">{vehicle.status}</span>
              <span className="badge">{vehicle.condition}</span>
            </div>

            <div className="mt-6 bg-white card p-6">
              <h2 className="text-lg font-semibold text-[#1B2A49]">Este é o carro que você sonhou?</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Specs */}
            <div className="mt-6 bg-white card p-6">
              <h2 className="text-lg font-semibold text-[#1B2A49]">Especificações</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(vehicle.specs).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="font-semibold text-[#1B2A49]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`https://wa.me/5516992754544?text=Tenho interesse no veículo ${encodeURIComponent(vehicle.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-lg bg-[#00FFFF] px-6 py-3 text-center font-semibold text-[#072227]"
              >
                Fale com Mateus via WhatsApp
              </a>
              <button className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-[#1B2A49]">
                Simular Financiamento
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-white card p-6">
              <h2 className="text-sm font-semibold text-gray-500">INFORMAÇÕES ADICIONAIS</h2>
              <div className="mt-3 text-sm text-gray-600">
                <p>✓ Veículo revisado e garantido</p>
                <p>✓ Histórico completo de manutenção</p>
                <p>✓ Financiamento disponível</p>
                <p>✓ Garantia de segurança e confiabilidade</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
