"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LojaClient = dynamic(() => import('./LojaClient'), { ssr: false });

export default function Page() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando loja...</div>}>
      <LojaClient />
    </React.Suspense>
  );
}
