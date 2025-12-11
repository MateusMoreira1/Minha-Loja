'use client';
export default function ContactBar(){
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 max-sm:bottom-4 max-sm:right-4">
      <a
        href="https://wa.me/5516992754544?text=Tenho%20interesse%20em%20um%20ve%C3%ADculo"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#00FFFF] px-5 py-3 text-sm font-semibold text-[#072227] shadow-lg hover:shadow-xl hover:scale-105 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15.5C20.6 15.1 18.7 13.5 18.4 13.2C18.1 12.9 17.8 12.8 17.5 12.8C17.2 12.8 16.9 12.9 16.6 13.1C16.3 13.3 15.8 13.7 15.1 14.2C13.5 15.3 12.3 15.8 11.1 15.8C7.5 15.8 4.6 13 4.6 9.6C4.6 6.2 7.5 3.5 11.1 3.5C14.7 3.5 17.6 6.2 17.6 9.6C17.6 10.1 17.5 10.7 17.4 11.2C17.4 11.4 17.4 11.5 17.5 11.7C17.6 12 17.8 12.3 18.1 12.6C18.4 12.9 20.3 14.5 20.7 14.9C21 15.2 21.1 15.4 21 15.5Z" stroke="#072227" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Fale agora
      </a>

      <a
        href="#simular"
        className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-300 px-4 py-2.5 text-xs font-semibold text-[#1B2A49] shadow-md hover:shadow-lg transition max-sm:hidden"
      >
        💰 Simule seu sonho
      </a>
    </div>
  )
}
