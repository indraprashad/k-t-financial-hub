import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, User, Mail, Phone, MapPin, Calendar, LayoutDashboard, Home, Info, Briefcase, FileText, Phone as PhoneIcon, CalendarDays, Tags, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { useConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getAdminName } from "@/lib/contentStore";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar: string;
  lastLogin: string;
}

type Tab = "home" | "about" | "services" | "blog" | "categories" | "contact" | "consultation";

const NAV: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "contact", label: "Contact", icon: PhoneIcon },
  { id: "consultation", label: "Consultation", icon: CalendarDays },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirm, ConfirmDialogComponent } = useConfirmDialog();
  const adminName = getAdminName();
  
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Admin User",
    email: "td@dcpl.bt",
    phone: "+975 17836510",
    username: "td@dcpl.bt",
    bio: "Financial consultant and administrator at K & T Financial Hub.",
    location: "Thimphu, Bhutan",
    joinDate: "January 15, 2024",
    avatar: "",
    lastLogin: new Date().toLocaleString()
  });

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // Load profile from localStorage if exists
    const savedProfile = localStorage.getItem('user-profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    confirm(
      "Save Profile",
      "Are you sure you want to save these profile changes?",
      () => {
        localStorage.setItem('user-profile', JSON.stringify(profile));
        setDirty(false);
        toast({ 
          title: "Profile Updated", 
          description: "Your profile has been saved successfully." 
        });
      },
      { confirmText: "Save", variant: "default" }
    );
  };

  const handleBack = () => {
    if (dirty) {
      confirm(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        () => {
          navigate("/admin");
        },
        { confirmText: "Leave", variant: "destructive" }
      );
    } else {
      navigate("/admin");
    }
  };

  const handleLogout = () => {
    confirm(
      "Logout",
      "Are you sure you want to logout? Any unsaved changes will be lost.",
      () => {
        // Import and use adminLogout
        import("@/lib/contentStore").then(({ adminLogout }) => {
          adminLogout();
          navigate("/admin/login", { replace: true });
        });
      },
      { confirmText: "Logout", variant: "destructive" }
    );
  };

  const handleNavClick = (tab: Tab) => {
    if (dirty) {
      confirm(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        () => {
          navigate(`/admin#${tab}`);
        },
        { confirmText: "Leave", variant: "destructive" }
      );
    } else {
      navigate(`/admin#${tab}`);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/10">
          <div className="flex flex-col items-center gap-3">
            <button 
              onClick={() => navigate("/admin/profile")}
              className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent/30 transition-colors cursor-pointer"
              title="Edit Profile"
            >
              <span className="text-accent text-2xl font-bold">
                {adminName.charAt(0).toUpperCase()}
              </span>
            </button>
            <div className="text-center">
              <p className="text-white font-medium text-sm">{adminName}</p>
              <p className="text-white/60 text-xs">td@dcpl.bt</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-white/60 hover:bg-white/10 hover:text-white"
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-destructive/20 hover:text-red-300 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b px-6 py-4 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-primary">Profile Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your personal information and preferences</p>
          </div>
        </header>

        {/* Editor */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Profile Content */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Avatar Section */}
              <div className="md:col-span-1">
                <div className="bg-card border rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                      {profile.avatar ? (
                        <img 
                          src={profile.avatar} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-accent text-4xl font-bold">
                          {profile.fullName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <ImageUpload
                      value={profile.avatar}
                      onChange={(url) => updateProfile('avatar', url)}
                      folder="profile-images"
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Upload a profile picture (JPG, PNG, max 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:col-span-2">
                <div className="bg-card border rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input 
                        value={profile.fullName} 
                        onChange={(e) => updateProfile('fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <Input 
                        type="email"
                        value={profile.email} 
                        onChange={(e) => updateProfile('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input 
                        value={profile.phone} 
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input 
                        value={profile.location} 
                        onChange={(e) => updateProfile('location', e.target.value)}
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <Textarea 
                      rows={4}
                      value={profile.bio} 
                      onChange={(e) => updateProfile('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Brief description about yourself (max 200 characters)
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={handleBack}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} disabled={!dirty}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ConfirmDialogComponent />
    </div>
  );
}
