import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Home, Info, Briefcase, FileText, Phone, CalendarDays,
  LogOut, Save, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink,
  RefreshCw, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminLogout, getContent, saveContent, resetContent, SiteContent, BlogPost, ServiceItem, ConsultationContent } from "@/lib/contentStore";
import { useToast } from "@/hooks/use-toast";

type Tab = "home" | "about" | "services" | "blog" | "contact" | "consultation";

const NAV: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "consultation", label: "Consultation", icon: CalendarDays },
];

// ─── Small field helpers ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-primary text-base border-b pb-3">{title}</h3>
      {children}
    </div>
  );
}

// ─── HOME TAB ────────────────────────────────────────────────────────────────
function HomeTab({ data, onChange }: { data: SiteContent["home"]; onChange: (d: SiteContent["home"]) => void }) {
  const set = (path: string, value: string) => {
    const parts = path.split(".");
    const updated = JSON.parse(JSON.stringify(data));
    let obj: any = updated;
    for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
    obj[parts[parts.length - 1]] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Hero Section">
        <Field label="Badge Text"><Input value={data.hero.badge} onChange={e => set("hero.badge", e.target.value)} /></Field>
        <Field label="Title Line 1"><Input value={data.hero.title} onChange={e => set("hero.title", e.target.value)} /></Field>
        <Field label="Title Highlight (gold text)"><Input value={data.hero.titleHighlight} onChange={e => set("hero.titleHighlight", e.target.value)} /></Field>
        <Field label="Subtitle"><Textarea rows={3} value={data.hero.subtitle} onChange={e => set("hero.subtitle", e.target.value)} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary CTA Button"><Input value={data.hero.ctaPrimary} onChange={e => set("hero.ctaPrimary", e.target.value)} /></Field>
          <Field label="Secondary CTA Button"><Input value={data.hero.ctaSecondary} onChange={e => set("hero.ctaSecondary", e.target.value)} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Stats Bar">
        <div className="grid sm:grid-cols-2 gap-4">
          {data.stats.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Field label={`Stat ${i + 1} Value`}>
                <Input value={s.value} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: e.target.value }; onChange({ ...data, stats: arr }); }} />
              </Field>
              <Field label="Label">
                <Input value={s.label} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], label: e.target.value }; onChange({ ...data, stats: arr }); }} />
              </Field>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Services Highlights (Home)">
        {data.services.map((s, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <p className="text-xs text-muted-foreground font-semibold">Card {i + 1}</p>
            <Field label="Title"><Input value={s.title} onChange={e => { const arr = [...data.services]; arr[i] = { ...arr[i], title: e.target.value }; onChange({ ...data, services: arr }); }} /></Field>
            <Field label="Description"><Textarea rows={2} value={s.desc} onChange={e => { const arr = [...data.services]; arr[i] = { ...arr[i], desc: e.target.value }; onChange({ ...data, services: arr }); }} /></Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Why Choose Us">
        <Field label="Section Heading"><Input value={data.whyUs.heading} onChange={e => onChange({ ...data, whyUs: { ...data.whyUs, heading: e.target.value } })} /></Field>
        <Field label="Subtitle"><Textarea rows={2} value={data.whyUs.subtitle} onChange={e => onChange({ ...data, whyUs: { ...data.whyUs, subtitle: e.target.value } })} /></Field>
        {data.whyUs.points.map((p, i) => (
          <div key={i} className="border rounded-lg p-3 space-y-2">
            <Field label={`Point ${i + 1} Title`}><Input value={p.title} onChange={e => { const pts = [...data.whyUs.points]; pts[i] = { ...pts[i], title: e.target.value }; onChange({ ...data, whyUs: { ...data.whyUs, points: pts } }); }} /></Field>
            <Field label="Description"><Input value={p.text} onChange={e => { const pts = [...data.whyUs.points]; pts[i] = { ...pts[i], text: e.target.value }; onChange({ ...data, whyUs: { ...data.whyUs, points: pts } }); }} /></Field>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Testimonials">
        {data.testimonials.map((t, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Testimonial {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { const arr = data.testimonials.filter((_, j) => j !== i); onChange({ ...data, testimonials: arr }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name"><Input value={t.name} onChange={e => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], name: e.target.value }; onChange({ ...data, testimonials: arr }); }} /></Field>
              <Field label="Role / Company"><Input value={t.role} onChange={e => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], role: e.target.value }; onChange({ ...data, testimonials: arr }); }} /></Field>
            </div>
            <Field label="Testimonial Text"><Textarea rows={3} value={t.text} onChange={e => { const arr = [...data.testimonials]; arr[i] = { ...arr[i], text: e.target.value }; onChange({ ...data, testimonials: arr }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, testimonials: [...data.testimonials, { name: "New Client", role: "Role, Company", text: "Enter testimonial text here.", rating: 5 }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add Testimonial
        </Button>
      </SectionCard>

      <SectionCard title="FAQ Section">
        {data.faqs.map((f, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">FAQ {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { const arr = data.faqs.filter((_, j) => j !== i); onChange({ ...data, faqs: arr }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Field label="Question"><Input value={f.q} onChange={e => { const arr = [...data.faqs]; arr[i] = { ...arr[i], q: e.target.value }; onChange({ ...data, faqs: arr }); }} /></Field>
            <Field label="Answer"><Textarea rows={3} value={f.a} onChange={e => { const arr = [...data.faqs]; arr[i] = { ...arr[i], a: e.target.value }; onChange({ ...data, faqs: arr }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, faqs: [...data.faqs, { q: "New Question?", a: "Answer goes here." }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add FAQ
        </Button>
      </SectionCard>

      <SectionCard title="CTA Banner">
        <Field label="Title"><Input value={data.cta.title} onChange={e => onChange({ ...data, cta: { ...data.cta, title: e.target.value } })} /></Field>
        <Field label="Subtitle"><Textarea rows={2} value={data.cta.subtitle} onChange={e => onChange({ ...data, cta: { ...data.cta, subtitle: e.target.value } })} /></Field>
      </SectionCard>
    </div>
  );
}

// ─── ABOUT TAB ───────────────────────────────────────────────────────────────
function AboutTab({ data, onChange }: { data: SiteContent["about"]; onChange: (d: SiteContent["about"]) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Hero Subtitle">
        <Field label="Subtitle"><Textarea rows={2} value={data.hero.subtitle} onChange={e => onChange({ ...data, hero: { ...data.hero, subtitle: e.target.value } })} /></Field>
      </SectionCard>

      <SectionCard title="Our Story">
        <Field label="Section Heading"><Input value={data.story.heading} onChange={e => onChange({ ...data, story: { ...data.story, heading: e.target.value } })} /></Field>
        {data.story.paragraphs.map((p, i) => (
          <Field key={i} label={`Paragraph ${i + 1}`}>
            <div className="flex gap-2">
              <Textarea rows={3} value={p} onChange={e => { const arr = [...data.story.paragraphs]; arr[i] = e.target.value; onChange({ ...data, story: { ...data.story, paragraphs: arr } }); }} />
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { const arr = data.story.paragraphs.filter((_, j) => j !== i); onChange({ ...data, story: { ...data.story, paragraphs: arr } }); }}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Field>
        ))}
        <Button variant="outline" size="sm" className="border-dashed" onClick={() => onChange({ ...data, story: { ...data.story, paragraphs: [...data.story.paragraphs, "New paragraph."] } })}>
          <Plus className="w-4 h-4 mr-1" /> Add Paragraph
        </Button>
      </SectionCard>

      <SectionCard title="Mission & Vision">
        <Field label="Our Mission"><Textarea rows={3} value={data.mission} onChange={e => onChange({ ...data, mission: e.target.value })} /></Field>
        <Field label="Our Vision"><Textarea rows={3} value={data.vision} onChange={e => onChange({ ...data, vision: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Team Members">
        {data.team.map((m, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Member {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => onChange({ ...data, team: data.team.filter((_, j) => j !== i) })}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name"><Input value={m.name} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], name: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
              <Field label="Role"><Input value={m.role} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], role: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
            </div>
            <Field label="Photo URL"><Input value={m.image} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], image: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
            <Field label="Bio"><Textarea rows={2} value={m.bio} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], bio: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, team: [...data.team, { name: "New Member", role: "Role", image: "", bio: "Bio here." }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add Team Member
        </Button>
      </SectionCard>

      <SectionCard title="Milestones Timeline">
        {data.milestones.map((m, i) => (
          <div key={i} className="flex gap-3 items-start border rounded-lg p-3">
            <div className="w-24 shrink-0">
              <Field label="Year"><Input value={m.year} onChange={e => { const arr = [...data.milestones]; arr[i] = { ...arr[i], year: e.target.value }; onChange({ ...data, milestones: arr }); }} /></Field>
            </div>
            <div className="flex-1">
              <Field label="Description"><Input value={m.text} onChange={e => { const arr = [...data.milestones]; arr[i] = { ...arr[i], text: e.target.value }; onChange({ ...data, milestones: arr }); }} /></Field>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive mt-5 shrink-0" onClick={() => onChange({ ...data, milestones: data.milestones.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, milestones: [...data.milestones, { year: "2025", text: "New milestone." }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add Milestone
        </Button>
      </SectionCard>
    </div>
  );
}

// ─── SERVICES TAB ─────────────────────────────────────────────────────────────
function ServicesTab({ data, onChange }: { data: ServiceItem[]; onChange: (d: ServiceItem[]) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {data.map((s, i) => (
        <div key={i} className="bg-card border rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="font-semibold text-primary">{s.title || `Service ${i + 1}`}</span>
            {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t">
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Field label="Title"><Input value={s.title} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], title: e.target.value }; onChange(arr); }} /></Field>
                <Field label="Tagline"><Input value={s.tagline} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], tagline: e.target.value }; onChange(arr); }} /></Field>
              </div>
              <Field label="Description"><Textarea rows={3} value={s.description} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], description: e.target.value }; onChange(arr); }} /></Field>
              <Field label="Image URL"><Input value={s.image} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], image: e.target.value }; onChange(arr); }} /></Field>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Features / Bullet Points</p>
                <div className="space-y-2">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex gap-2">
                      <Input value={f} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], features: arr[i].features.map((x, xi) => xi === fi ? e.target.value : x) }; onChange(arr); }} />
                      <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { const arr = [...data]; arr[i] = { ...arr[i], features: arr[i].features.filter((_, xi) => xi !== fi) }; onChange(arr); }}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="border-dashed" onClick={() => { const arr = [...data]; arr[i] = { ...arr[i], features: [...arr[i].features, "New feature"] }; onChange(arr); }}>
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Feature
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" className="border-dashed w-full" onClick={() => onChange([...data, { id: `service-${Date.now()}`, title: "New Service", tagline: "", description: "", features: [], image: "" }])}>
        <Plus className="w-4 h-4 mr-2" /> Add New Service
      </Button>
    </div>
  );
}

// ─── BLOG TAB ─────────────────────────────────────────────────────────────────
function BlogTab({ data, onChange }: { data: BlogPost[]; onChange: (d: BlogPost[]) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {data.map((p, i) => (
        <div key={i} className="bg-card border rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div>
              <span className="font-semibold text-primary block truncate max-w-md">{p.title || `Post ${i + 1}`}</span>
              <span className="text-xs text-muted-foreground">{p.category} · {p.date}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {p.featured && <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">Featured</span>}
              <Button variant="ghost" size="icon" className="text-destructive h-7 w-7" onClick={e => { e.stopPropagation(); onChange(data.filter((_, j) => j !== i)); }}><Trash2 className="w-3.5 h-3.5" /></Button>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Title"><Input value={p.title} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], title: e.target.value }; onChange(arr); }} /></Field>
                <Field label="Slug (URL)"><Input value={p.slug} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], slug: e.target.value }; onChange(arr); }} /></Field>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Category">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={p.category} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], category: e.target.value }; onChange(arr); }}>
                    {["Tax", "Accounting", "Business"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Author"><Input value={p.author} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], author: e.target.value }; onChange(arr); }} /></Field>
                <Field label="Date"><Input value={p.date} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], date: e.target.value }; onChange(arr); }} /></Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Read Time"><Input value={p.readTime} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], readTime: e.target.value }; onChange(arr); }} /></Field>
                <Field label="Image URL"><Input value={p.image} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], image: e.target.value }; onChange(arr); }} /></Field>
              </div>
              <Field label="Excerpt"><Textarea rows={2} value={p.excerpt} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], excerpt: e.target.value }; onChange(arr); }} /></Field>
              <Field label="Full Article Body"><Textarea rows={8} value={p.body ?? ""} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], body: e.target.value }; onChange(arr); }} /></Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={p.featured} onChange={e => { const arr = [...data]; arr[i] = { ...arr[i], featured: e.target.checked }; onChange(arr); }} className="w-4 h-4 accent-primary" />
                <span className="text-sm font-medium">Mark as Featured Article</span>
              </label>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" className="border-dashed w-full" onClick={() => onChange([...data, { slug: `new-post-${Date.now()}`, category: "Business", title: "New Article", excerpt: "", author: "", date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), readTime: "5 min read", image: "", featured: false, body: "" }])}>
        <Plus className="w-4 h-4 mr-2" /> Add New Blog Post
      </Button>
    </div>
  );
}

// ─── CONTACT TAB ─────────────────────────────────────────────────────────────
function ContactTab({ data, onChange }: { data: SiteContent["contact"]; onChange: (d: SiteContent["contact"]) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Contact Details">
        <Field label="Phone Number"><Input value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} /></Field>
        <Field label="Email Address"><Input type="email" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} /></Field>
      </SectionCard>

      <SectionCard title="Office Address">
        {data.address.map((line, i) => (
          <Field key={i} label={`Line ${i + 1}`}>
            <div className="flex gap-2">
              <Input value={line} onChange={e => { const arr = [...data.address]; arr[i] = e.target.value; onChange({ ...data, address: arr }); }} />
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => onChange({ ...data, address: data.address.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Field>
        ))}
        <Button variant="outline" size="sm" className="border-dashed" onClick={() => onChange({ ...data, address: [...data.address, ""] })}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Line
        </Button>
      </SectionCard>

      <SectionCard title="Office Hours">
        {data.hours.map((h, i) => (
          <Field key={i} label={`Line ${i + 1}`}>
            <div className="flex gap-2">
              <Input value={h} onChange={e => { const arr = [...data.hours]; arr[i] = e.target.value; onChange({ ...data, hours: arr }); }} />
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => onChange({ ...data, hours: data.hours.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Field>
        ))}
        <Button variant="outline" size="sm" className="border-dashed" onClick={() => onChange({ ...data, hours: [...data.hours, ""] })}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Line
        </Button>
      </SectionCard>

      <SectionCard title="Google Maps Embed URL">
        <Field label="Map Embed src (from Google Maps share → Embed a map)">
          <Textarea rows={3} value={data.mapSrc} onChange={e => onChange({ ...data, mapSrc: e.target.value })} />
        </Field>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
          Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </SectionCard>
    </div>
  );
}

// ─── CONSULTATION TAB ────────────────────────────────────────────────────────
function ConsultationTab({ data, onChange }: { data: ConsultationContent; onChange: (d: ConsultationContent) => void }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Notification Settings">
        <Field label="Notification Email (receives booking alerts)">
          <Input type="email" value={data.notificationEmail} onChange={e => onChange({ ...data, notificationEmail: e.target.value })} />
        </Field>
      </SectionCard>

      <SectionCard title="Services List (shown in booking form dropdown)">
        {data.services.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input value={s} onChange={e => { const arr = [...data.services]; arr[i] = e.target.value; onChange({ ...data, services: arr }); }} />
            <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => onChange({ ...data, services: data.services.filter((_, j) => j !== i) })}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, services: [...data.services, "New Service"] })}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Service Option
        </Button>
      </SectionCard>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [content, setContent] = useState<SiteContent>(getContent);
  const [dirty, setDirty] = useState(false);

  const update = (key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    saveContent(content);
    setDirty(false);
    toast({ title: "Changes saved!", description: "The website content has been updated." });
  };

  const handleReset = () => {
    if (!confirm("Reset all content to defaults? This cannot be undone.")) return;
    resetContent();
    setContent(getContent());
    setDirty(false);
    toast({ title: "Content reset to defaults." });
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-accent" />
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
          <p className="text-white/40 text-xs mt-0.5">K & T Financial</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? "bg-accent text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-destructive/20 hover:text-red-300 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-primary capitalize">{activeTab} Content</h1>
            <p className="text-xs text-muted-foreground">Edit and save changes to update the live website</p>
          </div>
          <div className="flex items-center gap-3">
            {dirty && (
              <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                Unsaved changes
              </div>
            )}
            <Button variant="outline" size="sm" onClick={handleReset} className="text-muted-foreground">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reset
            </Button>
            <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
            </Button>
          </div>
        </header>

        {/* Editor */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {activeTab === "home" && <HomeTab data={content.home} onChange={v => update("home", v)} />}
            {activeTab === "about" && <AboutTab data={content.about} onChange={v => update("about", v)} />}
            {activeTab === "services" && <ServicesTab data={content.services} onChange={v => update("services", v)} />}
            {activeTab === "blog" && <BlogTab data={content.blog} onChange={v => update("blog", v)} />}
            {activeTab === "contact" && <ContactTab data={content.contact} onChange={v => update("contact", v)} />}
          </div>
        </main>
      </div>
    </div>
  );
}
