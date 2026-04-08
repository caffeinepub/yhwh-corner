import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Home,
  LogIn,
  LogOut,
  Megaphone,
  Menu,
  Search,
  ShieldCheck,
  Trophy,
  User,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";

const roleLinks = {
  creator: { href: "/creator", label: "Creator Dashboard", icon: Video },
  viewer: { href: "/rewards", label: "My Rewards", icon: Trophy },
  advertiser: { href: "/advertise", label: "Ad Marketplace", icon: Megaphone },
  admin: { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
};

export function Navbar() {
  const { login, logout, isAuthenticated, isLoading } = useAuth();
  const { user } = useCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const roleLink = user?.role ? roleLinks[user.role] : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.navigate({ to: "/search", search: { q: searchQuery.trim() } });
    }
  };

  return (
    <header
      className="bg-card border-b border-border/60 sticky top-0 z-50 shadow-card"
      data-ocid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-1.5"
            data-ocid="nav-logo"
          >
            <div className="w-7 h-7 gradient-magenta-cyan rounded-lg flex items-center justify-center">
              <Video size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              YHWH<span className="text-primary"> Corner</span>
            </span>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md hidden md:flex"
          >
            <div className="relative w-full">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search videos, creators…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border/40 focus:border-primary/60 h-9 text-sm"
                data-ocid="nav-search"
              />
            </div>
          </form>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav-links"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
              activeProps={{ className: "text-foreground bg-secondary/80" }}
            >
              <Home size={15} />
              <span>Home</span>
            </Link>

            {roleLink && (
              <Link
                to={roleLink.href as "/"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
              >
                <roleLink.icon size={15} />
                <span>{roleLink.label}</span>
              </Link>
            )}
          </nav>

          <div className="flex-1 md:flex-none" />

          {/* Auth */}
          {!isLoading &&
            (isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="User menu"
                    type="button"
                    data-ocid="nav-user-menu"
                  >
                    <Avatar className="h-8 w-8 border-2 border-primary/40">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-display font-bold">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.username}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-xs text-muted-foreground truncate">
                      {user.username}
                    </p>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary capitalize mt-0.5">
                      {user.role}
                    </span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="flex items-center gap-2">
                      <Home size={14} /> Home
                    </Link>
                  </DropdownMenuItem>
                  {roleLink && (
                    <DropdownMenuItem asChild>
                      <Link
                        to={roleLink.href as "/"}
                        className="flex items-center gap-2"
                      >
                        <roleLink.icon size={14} /> {roleLink.label}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-destructive focus:text-destructive"
                    data-ocid="nav-logout"
                  >
                    <LogOut size={14} className="mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isAuthenticated && !user ? (
              <Link to="/onboarding" data-ocid="nav-onboarding">
                <Button size="sm" variant="default">
                  <User size={14} className="mr-1.5" /> Setup Profile
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={() => login()}
                className="gradient-magenta-cyan text-white border-0 font-display font-semibold"
                data-ocid="nav-login"
              >
                <LogIn size={14} className="mr-1.5" /> Sign In
              </Button>
            ))}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t border-border/40 py-3 space-y-1"
            data-ocid="nav-mobile-menu"
          >
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="search"
                  placeholder="Search videos…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary/50 border-border/40 h-9 text-sm"
                />
              </div>
            </form>

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
            >
              <Home size={15} /> Home
            </Link>

            {roleLink && (
              <Link
                to={roleLink.href as "/"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-smooth"
              >
                <roleLink.icon size={15} /> {roleLink.label}
              </Link>
            )}

            {!isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-smooth w-full text-left"
              >
                <LogIn size={15} /> Sign In with Internet Identity
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
