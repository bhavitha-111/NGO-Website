import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const categories = ['All', 'Education', 'Healthcare', 'Events', 'Team']

// SUN Foundation images
const galleryImages = Array.from({ length: 48 }, (_, i) => ({
  id: String(i + 1),
  url: `https://studentunionfornation.org/sunimages/sun${i + 1}.jpg`,
  caption: [
    'Students learning digital skills at Tech Saala',
    'Free health camp serving rural families',
    'Elite Queens self-defense workshop',
    'Feeding Hands food distribution drive',
    'Guiding Lights mentorship session',
    'Community health awareness program',
    'Youth leadership workshop',
    'Annual volunteer gathering 2023',
    'Rural education initiative',
    'Women empowerment summit',
    'Medical camp — blood pressure checkup',
    'Coding bootcamp for school students',
    'Life Saviours blood donation drive',
    'Visual Vibes photography workshop',
    'SUN Foundation founders with volunteers',
    'Community outreach in Guntur district',
  ][i % 16],
  category: ['Education', 'Healthcare', 'Events', 'Team', 'Education', 'Healthcare', 'Events', 'Team'][i % 8],
}))

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const filtered = activeCategory === 'All'
    ? galleryImages.filter(img => !failedImages.has(img.id))
    : galleryImages.filter(img => img.category === activeCategory && !failedImages.has(img.id))

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null)
  }, [filtered.length])
  const nextImage = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % filtered.length : null)
  }, [filtered.length])

  const handleImageError = (id: string) => {
    setFailedImages(prev => new Set([...prev, id]))
  }

  return (
    <>
      <Helmet>
        <title>Gallery — SUN Foundation</title>
        <meta name="description" content="Browse SUN Foundation's photo gallery showcasing our community programs, health camps, education drives, and volunteer activities." />
      </Helmet>

      <PageHero
        title="Photo Gallery"
        subtitle="A visual journey through our decade of impact — one photograph at a time."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Gallery' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium font-body transition-all ${
                  activeCategory === cat
                    ? 'bg-saffron-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={() => handleImageError(image.id)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Badge variant="saffron" className="text-xs mb-1">{image.category}</Badge>
                    <p className="text-white text-xs font-body line-clamp-1">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl p-0 bg-black border-0 overflow-hidden">
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].caption}
                className="w-full max-h-[80vh] object-contain"
              />

              <div className="p-4 bg-black">
                <div className="flex items-center gap-2">
                  <Badge variant="saffron" className="text-xs">{filtered[lightboxIndex].category}</Badge>
                  <p className="text-white/80 text-sm font-body">{filtered[lightboxIndex].caption}</p>
                </div>
                <p className="text-white/40 text-xs mt-1 font-body">
                  {lightboxIndex + 1} of {filtered.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
