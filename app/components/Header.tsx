'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition flex-shrink-0">
          <div className="w-12 h-12 flex-shrink-0">
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
          <div>
            <div className="text-lg font-bold text-[#1B2A49]">Mateus Multimarcas</div>
            <div className="text-xs text-gray-500">Seu carro ideal</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 md:flex items-center">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition">
            Home
          </Link>
          <Link href="/loja" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition">
            Loja
          </Link>
          <Link href="#admin" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition">
            Admin
          </Link>
          <a href="https://wa.me/5516992754544" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#072227] px-5 py-2.5 rounded-lg font-semibold hover:bg-white transition shadow-lg">
            💬 Fale Conosco
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3">
          <a href="https://wa.me/5516992754544" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 bg-[#00FFFF] text-[#072227] px-3 py-2 rounded-lg font-semibold text-sm hover:bg-white transition">
            💬
          </a>
          <button
            aria-label="abrir menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container flex flex-col gap-4 py-4">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition py-2">
              Home
            </Link>
            <Link href="/loja" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition py-2">
              Loja
            </Link>
            <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-[#1B2A49] transition py-2">
              Admin
            </Link>
            <a href="https://wa.me/5516992754544" target="_blank" rel="noreferrer" className="w-full text-center bg-[#00FFFF] text-[#072227] px-5 py-2.5 rounded-lg font-semibold hover:bg-white transition">
              💬 Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

