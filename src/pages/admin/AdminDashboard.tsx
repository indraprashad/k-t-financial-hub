import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Home, Info, Briefcase, FileText, Phone, CalendarDays,
  LogOut, Save, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink,
  RefreshCw, AlertCircle, Tags, Bell, X, Mail, Calendar, User, Key, Lock, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminLogout, getContent, saveContent, SiteContent, BlogPost, ServiceItem, ConsultationContent, getAdminName, getAdminProfileData, saveHomeContentData, saveAboutContentData, saveServiceItem, refreshContent } from "@/lib/contentStore";
import { generateSlug } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";

// Change Password Form Component
function ChangePasswordForm({ onCancel, onSuccess }: { onCancel: () => void; onSuccess: () => void }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error", 
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, you would call your password change API here
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate password change validation
      if (oldPassword !== "admin123") { // This is just for demo - in real app, validate against current password
        toast({
          title: "Error",
          description: "Old password is incorrect",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password changed successfully"
      });

      onSuccess();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-primary border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary/80 px-8 py-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/60 rounded-full flex items-center justify-center border border-white/10">
              <Lock className="w-6 h-6 text-white/80" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
              <p className="text-white/60 text-sm mt-1">Update your account security credentials</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                <Key className="w-4 h-4 text-white/60" />
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="bg-primary/80 border-white/10 text-white placeholder-white/40 pr-12 h-12 rounded-lg focus:border-white/30 focus:ring-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/5 p-1.5 rounded-md transition-all"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                <Lock className="w-4 h-4 text-white/60" />
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="bg-primary/80 border-white/10 text-white placeholder-white/40 pr-12 h-12 rounded-lg focus:border-white/30 focus:ring-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/5 p-1.5 rounded-md transition-all"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword && (
                <div className="text-xs text-white/60 mt-1">
                  {newPassword.length >= 6 ? (
                    <span className="text-green-400">✓ Password meets minimum length</span>
                  ) : (
                    <span className="text-amber-400">Password must be at least 6 characters</span>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                <Lock className="w-4 h-4 text-white/60" />
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="bg-primary/80 border-white/10 text-white placeholder-white/40 pr-12 h-12 rounded-lg focus:border-white/30 focus:ring-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:bg-white/5 p-1.5 rounded-md transition-all"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="text-xs text-white/60 mt-1">
                  {confirmPassword === newPassword ? (
                    <span className="text-green-400">✓ Passwords match</span>
                  ) : (
                    <span className="text-red-400">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-primary/60 rounded-lg p-4 border border-white/5">
              <h4 className="text-sm font-semibold text-white/90 mb-2">Password Requirements:</h4>
              <ul className="text-xs text-white/60 space-y-1">
                <li className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 6 ? 'bg-green-400' : 'bg-white/30'}`} />
                  At least 6 characters long
                </li>
                <li className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${confirmPassword === newPassword && confirmPassword ? 'bg-green-400' : 'bg-white/30'}`} />
                  New passwords must match
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 border-white/20 bg-primary/80 text-white hover:bg-white/10 h-12 rounded-lg font-medium transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 rounded-lg font-medium transition-all shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Changing Password...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Notification Dropdown Component
function NotificationDropdown({ 
  notifications, 
  onMarkAsRead, 
  onClearAll,
  unreadCount 
}: { 
  notifications: Array<{
    id: string;
    type: 'consultation' | 'general';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }>;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  unreadCount: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 bg-card border rounded-lg shadow-lg z-20 max-h-96 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearAll}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => {
                      onMarkAsRead(notification.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type Tab = "home" | "about" | "services" | "blog" | "categories" | "contact" | "consultation";

const NAV: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "categories", label: "Categories", icon: Tags },
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

// Helper function for delete confirmations
const confirmDelete = (itemName: string) => {
  return confirm(`Are you sure you want to delete this ${itemName}? This action cannot be undone.`);
};

// ─── HOME TAB ────────────────────────────────────────────────────────────────
function HomeTab({ data, onChange, confirm }: { 
  data: SiteContent["home"]; 
  onChange: (d: SiteContent["home"]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
}) {
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
        {data.stats.map((s, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Stat {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { confirm("Delete Stat", "Are you sure you want to delete this stat? This action cannot be undone.", () => { const arr = data.stats.filter((_, j) => j !== i); onChange({ ...data, stats: arr }); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Value">
                <Input value={s.value} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], value: e.target.value }; onChange({ ...data, stats: arr }); }} />
              </Field>
              <Field label="Label">
                <Input value={s.label} onChange={e => { const arr = [...data.stats]; arr[i] = { ...arr[i], label: e.target.value }; onChange({ ...data, stats: arr }); }} />
              </Field>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, stats: [...data.stats, { value: "New Value", label: "New Label" }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add Stat
        </Button>
      </SectionCard>

      <SectionCard title="Services Highlights (Home)">
        {data.services.map((s, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Card {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { confirm("Delete Service Card", "Are you sure you want to delete this service card? This action cannot be undone.", () => { const arr = data.services.filter((_, j) => j !== i); onChange({ ...data, services: arr }); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Field label="Title"><Input value={s.title} onChange={e => { const arr = [...data.services]; arr[i] = { ...arr[i], title: e.target.value }; onChange({ ...data, services: arr }); }} /></Field>
            <Field label="Description"><Textarea rows={2} value={s.desc} onChange={e => { const arr = [...data.services]; arr[i] = { ...arr[i], desc: e.target.value }; onChange({ ...data, services: arr }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, services: [...data.services, { title: "New Service", desc: "Service description goes here." }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add Service
        </Button>
      </SectionCard>

      <SectionCard title="Why Choose Us">
        <Field label="Section Heading"><Input value={data.whyUs.heading} onChange={e => onChange({ ...data, whyUs: { ...data.whyUs, heading: e.target.value } })} /></Field>
        <Field label="Subtitle"><Textarea rows={2} value={data.whyUs.subtitle} onChange={e => onChange({ ...data, whyUs: { ...data.whyUs, subtitle: e.target.value } })} /></Field>
        {data.whyUs.points.map((p, i) => (
          <div key={i} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">Point {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { confirm("Delete Point", "Are you sure you want to delete this point? This action cannot be undone.", () => { const pts = data.whyUs.points.filter((_, j) => j !== i); onChange({ ...data, whyUs: { ...data.whyUs, points: pts } }); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Field label="Title"><Input value={p.title} onChange={e => { const pts = [...data.whyUs.points]; pts[i] = { ...pts[i], title: e.target.value }; onChange({ ...data, whyUs: { ...data.whyUs, points: pts } }); }} /></Field>
            <Field label="Description"><Input value={p.text} onChange={e => { const pts = [...data.whyUs.points]; pts[i] = { ...pts[i], text: e.target.value }; onChange({ ...data, whyUs: { ...data.whyUs, points: pts } }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, whyUs: { ...data.whyUs, points: [...data.whyUs.points, { title: "New Point Title", text: "Point description goes here." }] } })}>
          <Plus className="w-4 h-4 mr-1" /> Add Point
        </Button>
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
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { confirm("Delete FAQ", "Are you sure you want to delete this FAQ? This action cannot be undone.", () => { const arr = data.faqs.filter((_, j) => j !== i); onChange({ ...data, faqs: arr }); }); }}>
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
        {data.cta.map((c, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-semibold">CTA {i + 1}</p>
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { confirm("Delete CTA", "Are you sure you want to delete this CTA? This action cannot be undone.", () => { const arr = data.cta.filter((_, j) => j !== i); onChange({ ...data, cta: arr }); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Field label="Title"><Input value={c.title} onChange={e => { const arr = [...data.cta]; arr[i] = { ...arr[i], title: e.target.value }; onChange({ ...data, cta: arr }); }} /></Field>
            <Field label="Subtitle"><Textarea rows={2} value={c.subtitle} onChange={e => { const arr = [...data.cta]; arr[i] = { ...arr[i], subtitle: e.target.value }; onChange({ ...data, cta: arr }); }} /></Field>
          </div>
        ))}
        <Button variant="outline" size="sm" className="border-dashed w-full" onClick={() => onChange({ ...data, cta: [...data.cta, { title: "New CTA Title", subtitle: "CTA subtitle goes here." }] })}>
          <Plus className="w-4 h-4 mr-1" /> Add CTA
        </Button>
      </SectionCard>
    </div>
  );
}

// ─── ABOUT TAB ───────────────────────────────────────────────────────────────
function AboutTab({ data, onChange, confirm }: { 
  data: SiteContent["about"]; 
  onChange: (d: SiteContent["about"]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
}) {
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
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { if (confirmDelete("paragraph")) { const arr = data.story.paragraphs.filter((_, j) => j !== i); onChange({ ...data, story: { ...data.story, paragraphs: arr } }); } }}><Trash2 className="w-4 h-4" /></Button>
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
              <Button variant="ghost" size="sm" className="text-destructive h-7 px-2" onClick={() => { if (confirmDelete("team member")) { onChange({ ...data, team: data.team.filter((_, j) => j !== i) }); } }}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name"><Input value={m.name} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], name: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
              <Field label="Role"><Input value={m.role} onChange={e => { const arr = [...data.team]; arr[i] = { ...arr[i], role: e.target.value }; onChange({ ...data, team: arr }); }} /></Field>
            </div>
            <Field label="Photo">
              <ImageUpload
                value={m.image}
                onChange={(url) => { const arr = [...data.team]; arr[i] = { ...arr[i], image: url }; onChange({ ...data, team: arr }); }}
                folder="team-images"
              />
            </Field>
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
            <Button variant="ghost" size="icon" className="text-destructive mt-5 shrink-0" onClick={() => { if (confirmDelete("milestone")) { onChange({ ...data, milestones: data.milestones.filter((_, j) => j !== i) }) }; }}><Trash2 className="w-4 h-4" /></Button>
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
function ServicesTab({ data, onChange, confirm }: { 
  data: ServiceItem[]; 
  onChange: (d: ServiceItem[]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editingService, setEditingService] = useState<{ index: number; data: ServiceItem } | null>(null);
  
  const startEditing = (index: number) => {
    setEditingService({ index, data: { ...data[index] } });
    setExpanded(index);
  };
  
  const saveService = () => {
    if (editingService) {
      const arr = [...data];
      arr[editingService.index] = editingService.data;
      onChange(arr);
      setEditingService(null);
    }
  };
  
  const cancelEditing = () => {
    setEditingService(null);
  };
  
  const updateEditingService = (field: keyof ServiceItem, value: any) => {
    if (editingService) {
      setEditingService({
        ...editingService,
        data: { ...editingService.data, [field]: value }
      });
    }
  };
  
  const handleTitleBlur = () => {
    if (editingService) {
      // Auto-generate slug from title when title input loses focus
      const slug = generateSlug(editingService.data.title);
      updateEditingService('id', slug); // Update service ID (slug)
    }
  };
  
  const updateFeature = (featureIndex: number, value: string) => {
    if (editingService) {
      const features = [...editingService.data.features];
      features[featureIndex] = value;
      updateEditingService('features', features);
    }
  };
  
  const addFeature = () => {
    if (editingService) {
      updateEditingService('features', [...editingService.data.features, 'New feature']);
    }
  };
  
  const removeFeature = (featureIndex: number) => {
    if (editingService) {
      updateEditingService('features', editingService.data.features.filter((_, i) => i !== featureIndex));
    }
  };

  return (
    <div className="space-y-4">
      {data.map((s, i) => (
        <div key={i} className="bg-card border rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <span className="font-semibold text-primary">{s.title || `Service ${i + 1}`}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-destructive h-7 w-7" onClick={e => { e.stopPropagation(); confirm("Delete Service", "Are you sure you want to delete this service? This action cannot be undone.", () => { onChange(data.filter((_, j) => j !== i)); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t">
              {editingService?.index === i ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <Field label="Title">
                      <Input 
                        value={editingService.data.title} 
                        onChange={e => updateEditingService('title', e.target.value)} 
                        onBlur={handleTitleBlur}
                      />
                    </Field>
                    <Field label="Slug (URL)">
                      <Input 
                        value={editingService.data.id} 
                        disabled 
                        className="bg-muted/50 cursor-not-allowed"
                      />
                    </Field>
                  </div>
                  <Field label="Tagline">
                    <Input value={editingService.data.tagline} onChange={e => updateEditingService('tagline', e.target.value)} />
                  </Field>
                  <Field label="Description">
                    <Textarea rows={3} value={editingService.data.description} onChange={e => updateEditingService('description', e.target.value)} />
                  </Field>
                  <Field label="Image">
                    <ImageUpload
                      value={editingService.data.image}
                      onChange={(url) => updateEditingService('image', url)}
                      folder="service-images"
                    />
                  </Field>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Features / Bullet Points</p>
                    <div className="space-y-2">
                      {editingService.data.features.map((f, fi) => (
                        <div key={fi} className="flex gap-2">
                          <Input value={f} onChange={e => updateFeature(fi, e.target.value)} />
                          <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { if (confirmDelete("feature")) { removeFeature(fi); } }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="border-dashed" onClick={addFeature}>
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Feature
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={saveService}>
                      <Save className="w-4 h-4 mr-2" /> Save Service
                    </Button>
                    <Button variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title</p>
                      <p className="text-sm">{s.title}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tagline</p>
                      <p className="text-sm">{s.tagline}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</p>
                      <p className="text-sm">{s.description}</p>
                    </div>
                    {s.image && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Image</p>
                        <img src={s.image} alt="Service" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Features</p>
                      <ul className="text-sm space-y-1">
                        {s.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => startEditing(i)}>
                      <Save className="w-4 h-4 mr-2" /> Edit Service
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" className="border-dashed w-full" onClick={() => onChange([...data, { id: generateSlug("new-service"), title: "New Service", tagline: "", description: "", features: [], image: "" }])}>
        <Plus className="w-4 h-4 mr-2" /> Add New Service
      </Button>
    </div>
  );
}

// ─── BLOG TAB ─────────────────────────────────────────────────────────────────
function BlogTab({ data, onChange, confirm, categories, adminName }: { 
  data: BlogPost[]; 
  onChange: (d: BlogPost[]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
  categories: import("@/lib/contentStore").BlogCategory[];
  adminName: string | null;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<{ index: number; data: BlogPost } | null>(null);
  
  const startEditing = (index: number) => {
    setEditingPost({ index, data: { ...data[index] } });
    setExpanded(index);
  };
  
  const savePost = () => {
    if (editingPost) {
      // Clear timeout when saving
      if (slugTimeout) {
        clearTimeout(slugTimeout);
        setSlugTimeout(null);
      }
      
      // Auto-generate slug from title when saving
      const slug = generateSlug(editingPost.data.title || 'untitled');
      const updatedPost = { ...editingPost.data, slug };
      
      const arr = [...data];
      arr[editingPost.index] = updatedPost;
      onChange(arr);
      setEditingPost(null);
    }
  };
  
  const cancelEditing = () => {
    // Clear timeout when canceling
    if (slugTimeout) {
      clearTimeout(slugTimeout);
      setSlugTimeout(null);
    }
    setEditingPost(null);
  };
  
  const updateEditingPost = (field: keyof BlogPost, value: any) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        data: { ...editingPost.data, [field]: value }
      });
    }
  };
  
  const [slugTimeout, setSlugTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const handleTitleChange = (title: string) => {
    updateEditingPost('title', title);
  };
  
  const formatDateForInput = (date: string): string => {
    const d = new Date(date);
    // Get the local date components to avoid timezone issues
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };
  
  const formatDateForDisplay = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-4">
      {data.map((p, i) => (
        <div key={i} className="bg-card border rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div>
              <span className="font-semibold text-primary block truncate max-w-md">{p.title || "Untitled Post"}</span>
              <span className="text-xs text-muted-foreground">{p.category} · {p.date}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              {p.featured && <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">Featured</span>}
              <Button variant="ghost" size="icon" className="text-destructive h-7 w-7" onClick={e => { e.stopPropagation(); if (confirmDelete("blog post")) { onChange(data.filter((_, j) => j !== i)); } }}><Trash2 className="w-3.5 h-3.5" /></Button>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t pt-4">
              {editingPost?.index === i ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Title">
                      <Textarea rows={2} value={editingPost.data.title} onChange={e => handleTitleChange(e.target.value)} />
                    </Field>
                    <Field label="Category">
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editingPost.data.category} onChange={e => updateEditingPost('category', e.target.value)}>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Author">
                      <Input value={editingPost.data.author} onChange={e => updateEditingPost('author', e.target.value)} />
                    </Field>
                    <Field label="Date">
                      <Input 
                        type="date" 
                        value={formatDateForInput(editingPost.data.date)} 
                        onChange={e => updateEditingPost('date', formatDateForDisplay(e.target.value))} 
                      />
                    </Field>
                    <Field label="Read Time">
                      <Input value={editingPost.data.readTime} onChange={e => updateEditingPost('readTime', e.target.value)} />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Image">
                      <ImageUpload
                        value={editingPost.data.image}
                        onChange={(url) => updateEditingPost('image', url)}
                        folder="blog-images"
                      />
                    </Field>
                  </div>
                  <Field label="Excerpt">
                    <Textarea rows={2} value={editingPost.data.excerpt} onChange={e => updateEditingPost('excerpt', e.target.value)} />
                  </Field>
                  <Field label="Full Article Body">
                    <Textarea rows={8} value={editingPost.data.body ?? ""} onChange={e => updateEditingPost('body', e.target.value)} />
                  </Field>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingPost.data.featured} 
                      onChange={e => updateEditingPost('featured', e.target.checked)} 
                      className="w-4 h-4 accent-primary" 
                    />
                    <span className="text-sm font-medium">Mark as Featured Article</span>
                  </label>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={savePost}>
                      <Save className="w-4 h-4 mr-2" /> Save Post
                    </Button>
                    <Button variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title</p>
                      <p className="text-sm">{p.title}</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</p>
                        <p className="text-sm">{p.category}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Author</p>
                        <p className="text-sm">{p.author}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</p>
                        <p className="text-sm">{p.date}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Read Time</p>
                        <p className="text-sm">{p.readTime}</p>
                      </div>
                      {p.image && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Image</p>
                          <img src={p.image} alt="Blog post" className="w-32 h-32 object-cover rounded-lg border" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Excerpt</p>
                      <p className="text-sm">{p.excerpt}</p>
                    </div>
                    {p.body && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Article Body</p>
                        <p className="text-sm line-clamp-3">{p.body}</p>
                      </div>
                    )}
                    {p.featured && (
                      <div>
                        <span className="text-xs bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full">Featured Article</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => startEditing(i)}>
                      <Save className="w-4 h-4 mr-2" /> Edit Post
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" className="border-dashed w-full" onClick={() => onChange([...data, { 
        slug: `new-post-${Date.now()}`, 
        category: "Business", 
        title: "", 
        excerpt: "", 
        author: adminName || "Admin", // Auto-set author to logged-in admin
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), 
        readTime: "", 
        image: "", 
        featured: false, 
        body: "" 
      }])}>
        <Plus className="w-4 h-4 mr-2" /> Add New Blog Post
      </Button>
    </div>
  );
}

// ─── CATEGORIES TAB ──────────────────────────────────────────────────────────
function CategoriesTab({ data, onChange, confirm }: { 
  data: import("@/lib/contentStore").BlogCategory[]; 
  onChange: (d: import("@/lib/contentStore").BlogCategory[]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ index: number; data: import("@/lib/contentStore").BlogCategory } | null>(null);
  
  const startEditing = (index: number) => {
    setEditingCategory({ index, data: { ...data[index] } });
    setExpanded(index);
  };
  
  const saveCategory = () => {
    if (editingCategory) {
      const arr = [...data];
      arr[editingCategory.index] = editingCategory.data;
      onChange(arr);
      setEditingCategory(null);
    }
  };
  
  const cancelEditing = () => {
    setEditingCategory(null);
  };
  
  const updateEditingCategory = (field: keyof import("@/lib/contentStore").BlogCategory, value: any) => {
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        data: { ...editingCategory.data, [field]: value }
      });
    }
  };

  return (
    <div className="space-y-4">
      {data.map((c, i) => (
        <div key={i} className="bg-card border rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div>
              <span className="font-semibold text-primary">{c.name || `Category ${i + 1}`}</span>
              <span className="text-xs text-muted-foreground block mt-1">{c.description || "No description"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-destructive h-7 w-7" onClick={e => { e.stopPropagation(); confirm("Delete Category", "Are you sure you want to delete this category? This action cannot be undone.", () => { onChange(data.filter((_, j) => j !== i)); }); }}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>
          {expanded === i && (
            <div className="px-5 pb-5 space-y-4 border-t">
              {editingCategory?.index === i ? (
                <>
                  <div className="pt-4">
                    <Field label="Category Name">
                      <Input value={editingCategory.data.name} onChange={e => updateEditingCategory('name', e.target.value)} />
                    </Field>
                    <Field label="Description">
                      <Textarea rows={3} value={editingCategory.data.description || ""} onChange={e => updateEditingCategory('description', e.target.value)} />
                    </Field>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={saveCategory}>
                      <Save className="w-4 h-4 mr-2" /> Save Category
                    </Button>
                    <Button variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category Name</p>
                      <p className="text-sm">{c.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</p>
                      <p className="text-sm">{c.description || "No description"}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => startEditing(i)}>
                      <Save className="w-4 h-4 mr-2" /> Edit Category
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" className="border-dashed w-full" onClick={() => onChange([...data, { 
        id: `category-${Date.now()}`, 
        name: "New Category", 
        description: "" 
      }])}>
        <Plus className="w-4 h-4 mr-2" /> Add New Category
      </Button>
    </div>
  );
}

// ─── CONTACT TAB ─────────────────────────────────────────────────────────────
function ContactTab({ data, onChange, confirm }: { 
  data: SiteContent["contact"]; 
  onChange: (d: SiteContent["contact"]) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
}) {
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
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { if (confirmDelete("address line")) { onChange({ ...data, address: data.address.filter((_, j) => j !== i) }) }; }}><Trash2 className="w-4 h-4" /></Button>
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
              <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { if (confirmDelete("hour line")) { onChange({ ...data, hours: data.hours.filter((_, j) => j !== i) }) }; }}><Trash2 className="w-4 h-4" /></Button>
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
function ConsultationTab({ data, onChange, confirm, availableServices }: { 
  data: ConsultationContent; 
  onChange: (d: ConsultationContent) => void;
  confirm: (title: string, description: string, onConfirm: () => void, options?: { confirmText?: string; cancelText?: string; variant?: "default" | "destructive" }) => void;
  availableServices: ServiceItem[];
}) {
  const addServiceFromList = (serviceTitle: string) => {
    if (!data.services.includes(serviceTitle)) {
      onChange({ ...data, services: [...data.services, serviceTitle] });
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Notification Settings">
        <Field label="Notification Email (receives booking alerts)">
          <Input type="email" value={data.notificationEmail} onChange={e => onChange({ ...data, notificationEmail: e.target.value })} />
        </Field>
      </SectionCard>

      <SectionCard title="Services List (shown in booking form dropdown)">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Add from Available Services</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {availableServices
                .filter(service => !data.services.includes(service.title))
                .map(service => (
                  <Button
                    key={service.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addServiceFromList(service.title)}
                    className="justify-start text-left"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    {service.title}
                  </Button>
                ))}
              {availableServices.filter(service => !data.services.includes(service.title)).length === 0 && (
                <p className="text-sm text-muted-foreground col-span-2">All available services have been added</p>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Selected Services (in order they will appear)</p>
            {data.services.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-6">{i + 1}.</span>
                  <span className="text-sm">{s}</span>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={() => { if (confirmDelete("service")) { onChange({ ...data, services: data.services.filter((_, j) => j !== i) }); } }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {data.services.length === 0 && (
              <p className="text-sm text-muted-foreground">No services selected. Add services from the available services above.</p>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirm, ConfirmDialogComponent } = useConfirmDialog();
  
  // Load active tab from localStorage on mount
  const getSavedTab = (): Tab => {
    const saved = localStorage.getItem('admin-active-tab');
    return (saved as Tab) || "home";
  };
  
  const [activeTab, setActiveTab] = useState<Tab>(getSavedTab());
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [adminProfile, setAdminProfile] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'consultation' | 'general';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }>>([]);

  const addNotification = (type: 'consultation' | 'general', title: string, message: string) => {
    const notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Send email notification for consultation bookings
    if (type === 'consultation') {
      sendEmailNotification(title, message);
    }
  };

  // Load content and admin name on initial mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load content from database
        const siteContent = await getContent();
        setContent(siteContent);
        
        // Load admin name and profile
        const name = await getAdminName();
        const profile = await getAdminProfileData();
        setAdminName(name);
        setAdminProfile(profile);
      } catch (error) {
        console.error('Error loading initial data:', error);
        toast({
          title: "Error",
          description: "Failed to load content from database",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [toast]);

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  const update = (key: keyof SiteContent, value: any) => {
    if (!content) return;
    setContent(prev => prev ? { ...prev, [key]: value } : null);
    setDirty(true);
  };

  const handleSave = async () => {
    if (!content) return;
    
    confirm(
      "Save Changes",
      "Are you sure you want to save these changes? This will update the live website.",
      async () => {
        try {
          const success = await saveContent(content);
          if (success) {
            toast({
              title: "Success",
              description: "Content saved successfully!",
            });
            setDirty(false);
            // Refresh content to get latest from database
            const refreshed = await refreshContent();
            setContent(refreshed);
          } else {
            toast({
              title: "Error",
              description: "Failed to save content",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Save error:', error);
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            variant: "destructive"
          });
        }
      }
    );
  };

  const handleTabChange = (newTab: Tab) => {
    if (dirty) {
      confirm(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to switch tabs? Any unsaved changes will be lost.",
        () => {
          setActiveTab(newTab);
          setDirty(false);
          // Save active tab to localStorage
          localStorage.setItem('admin-active-tab', newTab);
        },
        { confirmText: "Switch Tab", variant: "destructive" }
      );
    } else {
      setActiveTab(newTab);
      // Save active tab to localStorage
      localStorage.setItem('admin-active-tab', newTab);
    }
  };

  const handleLogout = () => {
    confirm(
      "Logout",
      "Are you sure you want to logout? Any unsaved changes will be lost.",
      () => {
        adminLogout();
        navigate("/admin/login", { replace: true });
      },
      { confirmText: "Logout", variant: "destructive" }
    );
  };


  const sendEmailNotification = async (subject: string, message: string) => {
    try {
      // In a real implementation, you would call your email service here
      // For now, we'll simulate it with a toast
      console.log('Email notification sent:', { subject, message });
      
      // You could integrate with services like:
      // - SendGrid
      // - Resend
      // - AWS SES
      // - Or your own email API
      
      toast({
        title: "Email Notification Sent",
        description: "Notification email has been sent to the administrator.",
      });
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => navigate("/admin/profile")}
              className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors cursor-pointer overflow-hidden"
              title="Edit Profile"
            >
              {adminProfile?.avatar_url ? (
                <img 
                  src={adminProfile.avatar_url} 
                  alt="Admin Avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className="text-accent text-2xl font-bold">
                {adminName?.charAt(0).toUpperCase() || 'A'}
              </span>
            </button>
            <div className="text-center">
              <p className="text-white font-medium text-sm">{adminName || 'Admin'}</p>
              <p className="text-white/60 text-xs">td@dcpl.bt</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? "bg-accent text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-destructive/20 hover:text-red-300 transition-colors"
            >
              <User className="w-4 h-4 shrink-0" />
              Account
              <ChevronDown className={`w-4 h-4 shrink-0 ml-auto transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showUserDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setShowChangePassword(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <Key className="w-4 h-4 shrink-0" />
                  Change Password
                </button>
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-300 hover:bg-destructive/20 transition-colors"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-primary capitalize">
              {showChangePassword ? "Change Password" : `${activeTab} Content`}
            </h1>
            <p className="text-xs text-muted-foreground">
              {showChangePassword ? "Update your account password" : "Edit and save changes to update the live website"}
            </p>
          </div>
          {!showChangePassword && (
            <div className="flex items-center gap-3">
              <NotificationDropdown
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onClearAll={clearNotifications}
                unreadCount={unreadCount}
              />
              {dirty && (
                <div className="flex items-center gap-1.5 text-amber-600 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Unsaved changes
                </div>
              )}
              <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes
              </Button>
            </div>
          )}
        </header>

        {/* Editor */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {showChangePassword ? (
              <ChangePasswordForm
                onCancel={() => setShowChangePassword(false)}
                onSuccess={handlePasswordChangeSuccess}
              />
            ) : (
              <>
                {activeTab === "home" && <HomeTab data={content.home} onChange={v => update("home", v)} confirm={confirm} />}
                {activeTab === "about" && <AboutTab data={content.about} onChange={v => update("about", v)} confirm={confirm} />}
                {activeTab === "services" && <ServicesTab data={content.services} onChange={v => update("services", v)} confirm={confirm} />}
                {activeTab === "blog" && <BlogTab data={content.blog} onChange={v => update("blog", v)} confirm={confirm} categories={content.categories} adminName={adminName} />}
                {activeTab === "categories" && <CategoriesTab data={content.categories} onChange={v => update("categories", v)} confirm={confirm} />}
                {activeTab === "contact" && <ContactTab data={content.contact} onChange={v => update("contact", v)} confirm={confirm} />}
                {activeTab === "consultation" && <ConsultationTab data={content.consultation} onChange={v => update("consultation", v)} confirm={confirm} availableServices={content.services} />}
              </>
            )}
          </div>
        </main>
      </div>
      <ConfirmDialogComponent />
    </div>
  );
}
