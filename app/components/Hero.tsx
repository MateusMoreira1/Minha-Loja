'use client';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1B2A49] via-[#253456] to-[#0F172A] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FFFF] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-[#00FFFF] opacity-5 rounded-full blur-3xl"></div>

      <div className="container relative z-10 py-16 lg:py-32">
        <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center">
          {/* Text Content */}
          <div className="flex-1 animate-fadeIn">
            <div className="inline-block px-4 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/30 rounded-full mb-4">
              <span className="text-sm font-semibold text-[#00FFFF]">✨ Bem-vindo à Mateus Multimarcas</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white mb-6">
              Seu sonho de carro à um clique de <span className="text-[#00FFFF]">distância.</span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-lg leading-relaxed mb-8">
              Descubra centenas de veículos multimarcas selecionados com cuidado. Qualidade garantida, preços justos e total transparência em cada negócio.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-100">
                <span className="text-2xl">✓</span>
                <span>Veículos revisados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-100">
                <span className="text-2xl">✓</span>
                <span>Garantia total</span>
              </div>
              <div className="flex items-center gap-2 text-gray-100">
                <span className="text-2xl">✓</span>
                <span>Financiamento</span>
              </div>
            </div>

            <div className="max-w-2xl">
              <SearchBar />
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center lg:justify-end animate-slideInRight">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/20 to-[#00FFFF]/5 rounded-3xl blur-2xl"></div>
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#00FFFF]/10 to-transparent p-8 border border-[#00FFFF]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-[#00FFFF] font-bold text-lg">Mais de 50</p>
                  <p className="text-gray-200">Veículos em estoque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
