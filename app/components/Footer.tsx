'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [adminConfig, setAdminConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/config')
      .then((res) => res.json())
      .then((data) => setAdminConfig(data))
      .catch(() => {});
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#F7F9FB] to-white border-t border-gray-100">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="95" fill="#1B2A49" stroke="#00FFFF" strokeWidth="2"/>
                  <g transform="translate(50, 75)">
                    <circle cx="15" cy="55" r="8" fill="#00FFFF"/>
                    <circle cx="15" cy="55" r="5" fill="#1B2A49"/>
                    <circle cx="75" cy="55" r="8" fill="#00FFFF"/>
                    <circle cx="75" cy="55" r="5" fill="#1B2A49"/>
                    <path d="M 20 45 L 25 20 Q 30 15 40 15 L 50 15 Q 60 15 65 20 L 70 45 Z" fill="#00FFFF" stroke="#00FFFF" strokeWidth="1.5"/>
                    <path d="M 30 20 Q 35 10 45 10 Q 55 10 60 20" fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="28" y="18" width="12" height="8" fill="#1B2A49" rx="1"/>
                    <rect x="50" y="18" width="12" height="8" fill="#1B2A49" rx="1"/>
                    <line x1="20" y1="40" x2="70" y2="40" stroke="#1B2A49" strokeWidth="1"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1B2A49]">Mateus Multimarcas</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">Onde seu sonho de carro se torna realidade. Confiança, transparência e qualidade em cada negociação.</p>
            <p className="text-xs text-gray-400">© {currentYear} Todos os direitos reservados.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-[#1B2A49] mb-4 text-sm uppercase tracking-wider">Links Rápidos</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li>
                <a href="/" className="hover:text-[#00FFFF] transition font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="/loja" className="hover:text-[#00FFFF] transition font-medium">
                  Loja
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[#00FFFF] transition font-medium">
                  Admin
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#00FFFF] transition font-medium">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-[#1B2A49] mb-4 text-sm uppercase tracking-wider">Contato</h3>
            <div className="text-sm text-gray-600 space-y-4">
              {adminConfig && (
                <>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <a href={`mailto:${adminConfig.email}`} className="hover:text-[#00FFFF] transition font-medium">
                      {adminConfig.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Telefone</div>
                    <a href={`tel:+${adminConfig.phone}`} className="hover:text-[#00FFFF] transition font-medium">
                      {adminConfig.phone}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Horário</div>
                    <div className="font-medium">{adminConfig.businessHours}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Profile Card */}
          {adminConfig && (
            <div className="bg-gradient-to-br from-[#1B2A49] to-[#0F172A] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
              <div className="text-xs font-semibold text-[#00FFFF] uppercase tracking-wider mb-3">Conheça Mateus</div>

              {/* Profile Image */}
              <div className="h-16 w-16 rounded-full bg-white/10 mb-4 overflow-hidden flex items-center justify-center border-2 border-[#00FFFF]">
                <img
                  src={adminConfig.profileImage}
                  alt={adminConfig.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/admin-profile.svg';
                  }}
                />
              </div>

              <h4 className="text-lg font-bold mb-1">{adminConfig.name}</h4>
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">{adminConfig.about}</p>

              <a
                href={`https://wa.me/${adminConfig.phone}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-[#00FFFF] text-[#072227] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-white transition"
              >
                💬 Fale com Mateus
              </a>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            Desenvolvido com ❤️ para Mateus Multimarcas
          </p>
        </div>
      </div>
    </footer>
  );
}
