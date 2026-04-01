import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Copy, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import PageHero from '@/components/shared/PageHero'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Separator } from '@/components/ui/separator'

// Mock single post content
const mockPost = {
  slug: '',
  title: 'How Tech Saala Is Bridging the Digital Divide in Rural AP',
  excerpt: 'Inside the journey of 45 young educators teaching Python and internet skills to kids who\'ve never owned a computer.',
  content: `
    <p>In the dusty classrooms of Guntur district, something extraordinary is happening. Forty-five young volunteers from SUN Foundation's Tech Saala team arrive every Saturday morning with laptops, extension cords, and an unshakeable belief: that every child, regardless of their postcode, deserves to speak the language of the 21st century.</p>

    <h2>The Problem We're Solving</h2>
    <p>India's digital divide is stark. While metros boom with AI startups and billion-dollar unicorns, villages an hour away from Vijayawada have students who've never typed on a keyboard. The 2021 Census data shows that only 8% of rural households in Andhra Pradesh have a computer.</p>

    <p>Tech Saala exists to change this. Not eventually. Now.</p>

    <h2>What Happens in a Tech Saala Session</h2>
    <p>Every session starts the same way: a volunteer holds up their phone and asks, "What can this do?" The kids shout answers — take photos, play games, call people. Then the volunteer says: "What if I told you that you can build the games?"</p>

    <p>The room goes quiet. Then it erupts.</p>

    <p>Over 8 weeks, students learn the basics of Python — variables, loops, conditionals — through games they actually want to play. They build a simple quiz game about their village. They create basic websites about their school. By week 8, they present their projects to their parents and teachers.</p>

    <h2>The Results Are Speaking</h2>
    <p>In the last 3 years, Tech Saala has trained 1,500+ students across 12 government schools. Thirty students have gone on to take formal computer science courses. Three have been accepted to engineering colleges.</p>

    <p>But beyond numbers, we see something more valuable: curiosity. Kids who once thought technology was something that "other people" understand — now they know it's something they can build.</p>

    <h2>Join Tech Saala</h2>
    <p>We need more volunteers — especially people with any technical background, even basic. If you know Python, HTML, or even just how to use the internet confidently, you can change a child's trajectory.</p>

    <p>Sign up at our volunteer page and choose Tech Saala. We'll take it from there.</p>
  `,
  category: 'Technology',
  featuredImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1200&q=80',
  author: { name: 'Pavan Kumar', initials: 'PK', role: 'Co-Founder & CTO', bio: 'Tech innovator and co-founder of SUN Foundation. Leads all digital literacy programs.' },
  date: 'Mar 25, 2026',
  readTime: 5,
  badge: 'secondary' as const,
  tags: ['Technology', 'Education', 'Rural Development', 'Digital Literacy'],
}

const relatedPosts = [
  { slug: 'guiding-lights-mentorship-success', title: 'From Village to IIT: How Guiding Lights Changed Arjun\'s Life', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80', readTime: 5, date: 'Jan 30, 2026' },
  { slug: '10-years-of-sun-foundation', title: '10 Years of SUN Foundation: What We\'ve Learned', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&q=80', readTime: 12, date: 'Feb 15, 2026' },
]

export default function BlogDetail() {
  const { slug } = useParams()
  const post = { ...mockPost, slug: slug || '' }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — SUN Foundation Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.featuredImage} />
      </Helmet>

      <div className="pt-16 bg-background">
        {/* Hero image */}
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 -mt-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 pb-16">
            {/* Main content */}
            <article>
              <Button asChild variant="ghost" size="sm" className="mb-6 gap-1.5 text-muted-foreground hover:text-foreground">
                <Link to="/blog"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
              </Button>

              <Badge variant={post.badge} className="mb-4">{post.category}</Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-5 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400 text-sm font-bold font-display">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold font-body text-foreground">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72">
                    <div className="flex gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-saffron-100 dark:bg-saffron-950 text-saffron-600 font-bold font-display">
                          {post.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold font-display text-foreground">{post.author.name}</p>
                        <p className="text-sm text-saffron-500">{post.author.role}</p>
                        <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Separator orientation="vertical" className="h-8" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {post.readTime} min read
                </span>
              </div>

              <Separator className="mb-8" />

              {/* Article body */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none font-body
                  prose-headings:font-display prose-headings:text-foreground
                  prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-a:text-saffron-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Separator className="my-8" />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium font-body text-foreground">Share:</span>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`)}>
                  <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`)}>
                  𝕏 Tweet
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={copyLink}>
                  <Copy className="w-4 h-4" /> Copy
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Related posts */}
              <div>
                <h3 className="font-bold font-display text-foreground mb-4">Related Stories</h3>
                <div className="space-y-4">
                  {relatedPosts.map(related => (
                    <Card key={related.slug} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <Link to={`/blog/${related.slug}`} className="block group">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="p-3">
                            <p className="text-sm font-semibold font-body text-foreground line-clamp-2 group-hover:text-saffron-500 transition-colors">
                              {related.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{related.date} • {related.readTime} min</p>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Volunteer CTA */}
              <Card className="bg-saffron-gradient border-0 text-white overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="font-bold font-display mb-2">Want to Help?</h3>
                  <p className="text-sm text-white/80 mb-4 font-body">
                    Join 500+ volunteers making this kind of impact every day.
                  </p>
                  <Button asChild variant="white-outline" size="sm" className="w-full">
                    <Link to="/volunteer">Become a Volunteer</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
