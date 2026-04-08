import { Separator } from "@/components/ui/separator";
import { SiGithub, SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div>
              <span className="font-display font-bold text-xl text-foreground">
                YHWH<span className="text-primary"> Corner</span>
              </span>
              <a
                href="https://YHWHcorner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-primary/70 hover:text-primary transition-colors duration-200 mt-0.5"
              >
                YHWHcorner.com
              </a>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              The righteous creator economy platform where every video earns,
              every viewer is rewarded, and advertisers reach the right
              audience.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://twitter.com"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <SiX size={16} />
              </a>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <SiGithub size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="/"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/creator"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  For Creators
                </a>
              </li>
              <li>
                <a
                  href="/rewards"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Viewer Rewards
                </a>
              </li>
              <li>
                <a
                  href="/advertise"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Advertise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-foreground mb-3">
              Earn
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="text-primary font-medium">Creators earn 25%+</li>
              <li className="text-accent font-medium">Viewers earn 1%/hr</li>
              <li>
                <a
                  href="/advertise"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Premium Ad Slots
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="opacity-30" />

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {year}. Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </span>
          <span>Powered by Internet Computer</span>
        </div>
      </div>
    </footer>
  );
}
