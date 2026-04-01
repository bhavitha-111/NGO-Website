import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { galleryApi } from '@/services/api'

interface GalleryImage {
  _id: string
  caption: string
  url: string
  category: string
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchImages = async () => {
    try {
      setLoading(true)
      const res = await galleryApi.getAll()
      setImages(res.data?.data?.images ?? res.data?.data ?? [])
    } catch {
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('title', file.name.replace(/\.[^.]+$/, ''))
        formData.append('caption', '')
        formData.append('category', 'All')
        await galleryApi.upload(formData)
      }
      toast.success(`${files.length} image(s) uploaded`)
      fetchImages()
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    try {
      await galleryApi.delete(id)
      toast.success('Image deleted')
      setImages(prev => prev.filter(img => img._id !== id))
    } catch {
      toast.error('Failed to delete image')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleUpload(e.dataTransfer.files)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Gallery</h1>
          <p className="text-muted-foreground text-sm font-body">{images.length} images</p>
        </div>
        <Button variant="saffron" size="sm" onClick={() => fileRef.current?.click()} className="gap-1.5" disabled={uploading}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => handleUpload(e.target.files)} />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-border hover:border-saffron-400'
        }`}
        onClick={() => fileRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground font-body text-sm">
          Drag & drop images here, or <span className="text-saffron-500">browse files</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB each</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading gallery...
        </div>
      ) : images.length === 0 ? (
        <Card><CardContent className="text-center py-16 text-muted-foreground">No images yet. Upload your first image.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image._id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img src={image.url} alt={image.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleDelete(image._id)} className="w-7 h-7 bg-destructive rounded-full flex items-center justify-center shadow-md" aria-label="Delete image">
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground truncate px-0.5">{image.caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
