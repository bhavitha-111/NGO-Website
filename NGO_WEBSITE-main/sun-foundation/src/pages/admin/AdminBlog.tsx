import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { blogApi } from '@/services/api'

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: 'Draft' | 'Published'
  author: string
  createdAt: string
}

interface PostForm {
  title: string
  excerpt: string
  content: string
  category: string
  status: 'Draft' | 'Published'
  author: string
}

const EMPTY_FORM: PostForm = {
  title: '',
  excerpt: '',
  content: '',
  category: 'General',
  status: 'Draft',
  author: 'Admin',
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await blogApi.getAll({ all: 'true' })
      setPosts(res.data?.data?.posts ?? res.data?.data ?? [])
    } catch {
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const handleNew = () => {
    setEditId(null)
    setForm(EMPTY_FORM)
    setEditorOpen(true)
  }

  const handleEdit = (post: Post) => {
    setEditId(post._id)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      status: post.status,
      author: post.author,
    })
    setEditorOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await blogApi.delete(id)
      toast.success('Post deleted')
      setPosts(prev => prev.filter(p => p._id !== id))
    } catch {
      toast.error('Failed to delete post')
    }
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    try {
      setSaving(true)
      if (editId) {
        await blogApi.update(editId, form)
        toast.success('Post updated')
      } else {
        await blogApi.create(form)
        toast.success('Post created')
      }
      setEditorOpen(false)
      fetchPosts()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(msg || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm font-body">{posts.length} posts total</p>
        </div>
        <Button variant="saffron" size="sm" onClick={handleNew} className="gap-1.5 self-start">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground font-body">
              No posts yet. Create your first post.
            </div>
          ) : (
            <div className="divide-y">
              {posts.map((post) => (
                <div key={post._id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={post.status === 'Published' ? 'forest' : 'saffron'} className="text-xs">
                        {post.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    </div>
                    <p className="font-semibold font-body text-foreground mt-1 truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      By {post.author} · {new Date(post.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <button onClick={() => handleEdit(post)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors" aria-label="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="p-1.5 text-muted-foreground hover:text-destructive rounded-md transition-colors" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">{editId ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Post title..." className="mt-1" />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Short summary..." className="mt-1 min-h-[60px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Education', 'Healthcare', 'Women Empowerment', 'Tech', 'Food', 'Events', 'General'].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as 'Draft' | 'Published' }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Author</Label>
              <Input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your blog content here..." className="mt-1 min-h-[160px]" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditorOpen(false)} disabled={saving}>Cancel</Button>
              <Button variant="saffron" onClick={handleSave} disabled={saving} className="gap-2">
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? 'Saving...' : 'Save Post'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
