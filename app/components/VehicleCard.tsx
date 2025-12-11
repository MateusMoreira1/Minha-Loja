import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  price: number;
  image?: string;
  year?: number;
  status?: string;
};

export default function VehicleCard({ id, title, price, image, year, status }: Props) {
  const isAvailable = status !== 'Vendido';
  const getStatusColor = () => {
    switch (status) {
      case 'Destaque':
        return 'bg-[#00FFFF] text-[#072227]';
      case 'Promoção':
        return 'bg-red-500 text-white';
      case 'Vendido':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <article className="group card overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl">
      <Link href={`/veiculos/${id}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">Imagem</div>
          )}

          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">VENDIDO</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {status && (
              <span className={`badge px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()} shadow-lg`}>
                {status}
              </span>
            )}
            {year && (
              <span className="badge px-3 py-1 rounded-full text-sm font-semibold bg-white/90 text-[#1B2A49] shadow-lg">
                {year}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#1B2A49] group-hover:text-[#00FFFF] transition line-clamp-2">
            {title}
          </h3>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-[#00FFFF]">
              R$ {price.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            {isAvailable ? (
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/5516992754544?text=Tenho interesse no veículo: ${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-lg bg-[#00FFFF] px-3 py-2 text-center text-sm font-semibold text-[#072227] hover:bg-white transition"
                >
                  💬 WhatsApp
                </a>
                <button className="flex-1 rounded-lg border-2 border-[#1B2A49] px-3 py-2 text-center text-sm font-semibold text-[#1B2A49] hover:bg-[#1B2A49] hover:text-white transition">
                  Ver Detalhes
                </button>
              </div>
            ) : (
              <button disabled className="w-full rounded-lg bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-600 cursor-not-allowed">
                Este veículo foi vendido
              </button>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
