import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mateus Multimarcas - Onde seu sonho de carro se torna realidade",
  description: "Encontre seu próximo veículo entre as melhores opções multimarcas. Carros seminovos e novos, revisados e com garantia. Financiamento disponível.",
  keywords: "carros, veículos, multimarcas, seminovo, novo, comprar carro, corretora, carros à venda",
  openGraph: {
    title: "Mateus Multimarcas - Seu carro ideal",
    description: "Descubra as melhores opções de veículos multimarcas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B2A49" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
