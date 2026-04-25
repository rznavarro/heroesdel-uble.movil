import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Heart, Share2 } from 'lucide-react';

// Todas las imágenes del LoginGate
const ALL_MEMORIES = [
  // Columna 1
  { img: "/gallery/img1.jpeg", title: "Archivo 1" },
  { img: "/gallery/img2.jpeg", title: "Archivo 2" },
  { img: "/gallery/img3.jpeg", title: "Archivo 3" },
  { img: "/gallery/img4.jpeg", title: "Archivo 4" },
  { img: "/gallery/img5.jpeg", title: "Archivo 5" },
  { img: "/gallery/img6.jpeg", title: "Archivo 6" },
  { img: "/gallery/img7.jpeg", title: "Archivo 7" },
  { img: "/gallery/img8.jpeg", title: "Archivo 8" },
  { img: "/gallery/img9.jpeg", title: "Archivo 9" },
  { img: "/gallery/img10.jpeg", title: "Archivo 10" },
  // Columna 2
  { img: "/gallery/img11.jpeg", title: "Archivo 11" },
  { img: "/gallery/img12.jpeg", title: "Archivo 12" },
  { img: "/gallery/img13.jpeg", title: "Archivo 13" },
  { img: "/gallery/img14.jpeg", title: "Archivo 14" },
  { img: "/gallery/img15.jpeg", title: "Archivo 15" },
  { img: "/gallery/img16.jpeg", title: "Archivo 16" },
  { img: "/gallery/img17.jpeg", title: "Archivo 17" },
  { img: "/gallery/img18.jpeg", title: "Archivo 18" },
  { img: "/gallery/img19.jpeg", title: "Archivo 19" },
  { img: "/gallery/img20.jpeg", title: "Archivo 20" },
  // Columna 3
  { img: "/gallery/img21.jpeg", title: "Archivo 21" },
  { img: "/gallery/img22.jpeg", title: "Archivo 22" },
  { img: "/gallery/img23.jpeg", title: "Archivo 23" },
  { img: "/gallery/img24.jpeg", title: "Archivo 24" },
  { img: "/gallery/img25.jpeg", title: "Archivo 25" },
  { img: "/gallery/img26.jpeg", title: "Archivo 26" },
  { img: "/gallery/img27.jpeg", title: "Archivo 27" },
  { img: "/gallery/img28.jpeg", title: "Archivo 28" },
  { img: "/gallery/img29.jpeg", title: "Archivo 29" },
  { img: "/gallery/img30.jpeg", title: "Archivo 30" },
];

export default function ModuleMemoriesGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof ALL_MEMORIES[0] | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (img: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(img)) {
      newFavorites.delete(img);
    } else {
      newFavorites.add(img);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-vortex-dark p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif italic text-white mb-2">
            Galería de Recuerdos
          </h1>
          <p className="text-slate-500 text-sm">
            Archivo fotográfico del Preuniversitario Los Héroes de Ñuble
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ALL_MEMORIES.map((memory, index) => (
            <motion.div
              key={`memory-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className="group relative aspect-square bg-slate-900 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(memory)}
            >
              <img
                src={memory.img}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(memory.img);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      favorites.has(memory.img) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={favorites.has(memory.img) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{memory.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal para imagen seleccionada */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-vortex-surface rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header del modal */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <h3 className="text-white font-medium">{selectedImage.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(selectedImage.img)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        favorites.has(selectedImage.img) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(selectedImage.img) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Imagen */}
                <div className="p-4">
                  <img
                    src={selectedImage.img}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            {ALL_MEMORIES.length} recuerdos • {favorites.size} favoritos
          </p>
        </div>
      </div>
    </div>
  );
}