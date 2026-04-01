import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Clock, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { blogApi } from '@/services/api'

interface BlogPost {
  _id: string
  slug: string
  title: string
  excerpt: string
  category: string
  featuredImage?: string
  author: string
  status: string
  readTime?: number
  publishedAt?: string
  createdAt: string
}

const categories = ['All', 'Education', 'Healthcare', 'Women Empowerment', 'Tech', 'Food', 'Events', 'General']

const categoryBadge = (cat: string) => {
  const map: Record<string, 'saffron' | 'forest' | 'golden' | 'secondary'> = {
    Education: 'forest', Healthcare: 'saffron', 'Women Empowerment': 'golden',
    Tech: 'saffron', Food: 'golden', Events: 'forest', General: 'secondary',
  }
  return map[cat] ?? 'secondary'
}

const fallbackImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await blogApi.getAll({ status: 'Published' })
        setPosts(res.data?.data?.posts ?? res.data?.data ?? [])
      } catch {
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const filtered = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesCat = category === 'All' || post.category === category
    return matchesSearch && matchesCat
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <Helmet>
        <title>Blog — SUN Foundation</title>
        <meta name="description" content="Stories, field reports, and insights from SUN Foundation's work across Andhra Pradesh." />
      </Helmet>

      <PageHero
        title="Stories of Change"
        subtitle="Field reports, impact stories, and insights from the ground — written by those living the mission."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Blog' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1) }}>
              <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin text-saffron-500" />
              <span className="font-body">Loading stories...</span>
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg">
                {posts.length === 0 ? 'No blog posts published yet.' : 'No posts match your search.'}
              </p>
              {posts.length > 0 && (
                <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setCategory('All') }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={post.featuredImage || fallbackImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage }}
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={categoryBadge(post.category)} className="text-xs">{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col h-[calc(100%-192px)]">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
                        )}
                      </div>
                      <h3 className="font-bold font-display text-foreground text-base mb-2 leading-tight line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="text-xs bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400">
                              {post.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs font-semibold text-foreground">{post.author}</p>
                        </div>
                        <Button asChild variant="ghost" size="sm" className="text-saffron-500 p-0 h-auto gap-1 hover:text-saffron-600">
                          <Link to={`/blog/${post.slug}`}>Read <ArrowRight className="w-3.5 h-3.5" /></Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i + 1} variant={page === i + 1 ? 'saffron' : 'outline'} size="sm" onClick={() => setPage(i + 1)}>{i + 1}</Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
