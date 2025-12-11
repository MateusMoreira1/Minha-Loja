'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VehicleCard from './components/VehicleCard';
import Footer from './components/Footer';
import ContactBar from './components/ContactBar';

type Vehicle = {
  id: string;
  title: string;
  price: number;
  year: number;
  status: string;
  images: string[];
};

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [adminConfig, setAdminConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/vehicles').then((res) => res.json()),
      fetch('/api/admin/config').then((res) => res.json()),
    ]).then(([vehiclesData, configData]) => {
      setVehicles(vehiclesData.slice(0, 6));
      setAdminConfig(configData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FB] font-sans flex flex-col">
      <Header />
      <Hero />

      <main className="flex-1 w-full">
        {/* Featured Vehicles Section */}
        <section className="container px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1B2A49]">Veículos em Destaque</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Conheça nossas melhores opções — cada uma selecionada com cuidado para garantir qualidade e confiabilidade.</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FFFF]"></div>
              </div>
              <p className="mt-4 text-gray-500">Carregando veículos...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {vehicles.map((v) => (
                  <VehicleCard key={v.id} id={v.id} title={v.title} price={v.price} image={v.images[0]} year={v.year} status={v.status} />
                ))}
              </div>

              <div className="text-center">
                <a href="/loja" className="inline-flex items-center gap-2 rounded-lg bg-[#1B2A49] px-8 py-4 font-semibold text-white hover:bg-[#0F172A] transition">
                  Ver Catálogo Completo →
                </a>
              </div>
            </>
          )}
        </section>

        {/* About Mateus Section */}
        {adminConfig && (
          <section className="bg-white py-16">
            <div className="container px-6">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-[#00FFFF]/20">
                    <img
                      src={adminConfig.profileImage}
                      alt={adminConfig.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/admin-profile.svg';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1B2A49] mb-4">Conheça {adminConfig.name}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{adminConfig.about}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✓</span>
                      <span className="text-gray-700">{adminConfig.businessHours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✓</span>
                      <span className="text-gray-700">Negociação transparente e justa</span>
                    </div>
                  </div>
                  <a href={`https://wa.me/${adminConfig.phone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#072227] px-6 py-3 rounded-lg font-semibold hover:bg-white transition">
                    💬 Fale com {adminConfig.name}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        <section className="container px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1B2A49]">O Que Nossos Clientes Dizem</h2>
            <p className="mt-2 text-gray-600">Avaliações de clientes satisfeitos que encontraram seu carro ideal</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'João Silva',
                role: 'Cliente verificado',
                text: 'Excelente atendimento! Encontrei o carro dos meus sonhos em perfeito estado. Mateus foi muito profissional e transparente em toda a negociação.',
                rating: 5,
              },
              {
                name: 'Maria Santos',
                role: 'Cliente verificado',
                text: 'Processo rápido, sem burocracia. Gostei muito do atendimento e da qualidade dos veículos. Já recomendei para amigos!',
                rating: 5,
              },
              {
                name: 'Carlos Lima',
                role: 'Cliente verificado',
                text: 'Ótima variedade de carros, preços competitivos e muita transparência. Mateus realmente se importa com a satisfação do cliente.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="card bg-white p-8 hover:shadow-lg transition">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-[#1B2A49]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#1B2A49] to-[#0F172A] text-white py-16">
          <div className="container px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para encontrar seu carro ideal?</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">Entre em contato agora e veja como posso ajudá-lo a encontrar o veículo perfeito para suas necessidades.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/loja" className="inline-flex items-center justify-center gap-2 bg-[#00FFFF] text-[#072227] px-8 py-3 rounded-lg font-semibold hover:bg-white transition">
                Explorar Catálogo
              </a>
              <a href={`https://wa.me/${adminConfig?.phone || '5516992754544'}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-[#00FFFF] text-[#00FFFF] px-8 py-3 rounded-lg font-semibold hover:bg-[#00FFFF] hover:text-[#072227] transition">
                Enviar Mensagem
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ContactBar />
    </div>
  );
}
