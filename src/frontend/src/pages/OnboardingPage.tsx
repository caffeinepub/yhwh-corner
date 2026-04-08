import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  FileText,
  Megaphone,
  Trophy,
  Video,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/useQueries";
import type { UserRole } from "../types";

const roles = [
  {
    id: "creator" as UserRole,
    label: "Creator",
    icon: Video,
    description: "Upload videos and earn 25%+ of revenue from your audience",
    highlight: "Earn 25% revenue share",
    color: "primary",
  },
  {
    id: "viewer" as UserRole,
    label: "Viewer",
    icon: Trophy,
    description: "Watch great content and earn 1% of platform revenue per hour",
    highlight: "Earn while you watch",
    color: "accent",
  },
  {
    id: "advertiser" as UserRole,
    label: "Advertiser",
    icon: Megaphone,
    description:
      "Reach engaged audiences with premium ad slots and airway time",
    highlight: "Premium placement",
    color: "primary",
  },
];

const disclaimerSections = [
  {
    id: "wallet",
    icon: Wallet,
    title: "Section 1: Wallet Requirement",
    variant: "info" as const,
    content: [
      "All users — creators, advertisers, and the platform owner — are required to have their own individual wallet account.",
      "Caffeine AI will facilitate wallet availability for all parties.",
      "You must have your wallet set up before engaging in any financial transactions on this platform.",
    ],
  },
  {
    id: "sabbath",
    icon: AlertTriangle,
    title: "Section 2: Advertiser Sabbath Observance Schedule",
    variant: "warning" as const,
    content: [
      "Advertisers are subject to a strict operational schedule in observance of the Sabbath.",
      "All advertising activity must STOP on Friday at 4:00 PM and may not RESUME until Sunday at 12:00 AM (midnight).",
      "No work of any kind is to be performed on the Sabbath. This schedule is strictly enforced.",
    ],
  },
  {
    id: "content",
    icon: AlertTriangle,
    title: "Section 3: Content Restrictions & Prohibited Material",
    variant: "danger" as const,
    content: [],
    bullets: [
      "Adult entertainment of ANY kind, including explicit sexual content (XXX)",
      "Any genre of music containing vulgar, obscene language, profanity, or cuss words",
      "Any content depicting women in an immodest manner — including showing cleavage, backside, legs, stomach, or any other body parts that violate modesty standards",
      "Grassroots entertainment of any kind",
      "Any Hollywood-produced entertainment, films, music, or media from top to bottom",
      "Vulgar, obscene, or profane language or imagery in any form",
      "Any polluted imagery or communication that provokes ungodliness, unYahliness, or sin",
      "Any content that violates the commandments of Yahweh as spoken in Exodus through Deuteronomy",
    ],
    footer:
      "We strongly urge all users to read and familiarize themselves with the Commandments of Emperor Yahweh found in Exodus through Deuteronomy.",
  },
  {
    id: "penalties",
    icon: AlertTriangle,
    title: "Section 4: Legal Penalties & Enforcement",
    variant: "danger" as const,
    content: [
      "This agreement constitutes a LEGALLY BINDING CONTRACT between the platform and each user.",
    ],
    subsections: [
      {
        label: "For ADVERTISERS and CONTENT CREATORS:",
        items: [
          "Financial Penalty: $1,000,000,000 (ONE BILLION DOLLARS) per transaction in violation",
          "Permanent expulsion from the platform with no right of return",
        ],
      },
      {
        label:
          "For VIEWERS who post, share, or link to unYahly or sinful content:",
        items: [
          "Financial Penalty: $100,000 per infraction",
          "Permanent expulsion from the platform with no right of return",
        ],
      },
    ],
  },
  {
    id: "acknowledgment",
    icon: FileText,
    title: "Section 5: Acknowledgment",
    variant: "info" as const,
    content: ["By creating an account on this platform, you acknowledge that:"],
    bullets: [
      "You have read and understood all of the above terms",
      "You agree to abide by all platform statutes, rules, and the commandments of Emperor Yahweh",
      "You understand this is a legally binding contract",
      "You accept all financial penalties and consequences for any violations",
    ],
  },
];

type Step = "role" | "details" | "disclaimer";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("role");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const register = useRegisterUser();

  const handleContinue = () => {
    if (!selectedRole) return;
    setStep("details");
  };

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    setStep("disclaimer");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !selectedRole || !agreed) return;

    try {
      await register.mutateAsync({
        username: username.trim(),
        email: email.trim(),
        role: selectedRole,
      });
      toast.success("Welcome to YHWH Corner!", {
        description: "Your profile has been created.",
      });
      navigate({ to: "/" });
    } catch {
      toast.error("Registration failed", { description: "Please try again." });
    }
  };

  const stepLabels: Record<Step, string> = {
    role: "Choose your role to get started",
    details: "Tell us a bit about yourself",
    disclaimer: "Review & agree to the Platform Agreement",
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-background"
      data-ocid="onboarding-page"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 gradient-magenta-cyan rounded-2xl mb-4 shadow-elevated">
            <Video size={24} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground">
            Welcome to{" "}
            <span className="text-gradient-magenta">YHWH Corner</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            {stepLabels[step]}
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {(["role", "details", "disclaimer"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
                    step === s
                      ? "gradient-magenta-cyan text-white shadow-elevated"
                      : (
                            (step === "details" && s === "role") ||
                              (step === "disclaimer" && s !== "disclaimer")
                          )
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {(step === "details" && s === "role") ||
                  (step === "disclaimer" && s !== "disclaimer") ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 h-0.5 rounded-full transition-smooth ${
                      (step === "details" && i === 0) || step === "disclaimer"
                        ? "bg-primary/40"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Role Selection */}
        {step === "role" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {roles.map((role, i) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-smooth cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-elevated"
                        : "border-border bg-card hover:border-border/80 hover:bg-card/80"
                    }`}
                    data-ocid={`role-${role.id}`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check
                          size={11}
                          className="text-primary-foreground"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? "gradient-magenta-cyan" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isSelected ? "text-white" : "text-muted-foreground"
                        }
                      />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base">
                      {role.label}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                    <div
                      className={`mt-3 text-xs font-semibold ${isSelected ? "text-primary" : "text-accent"}`}
                    >
                      ✦ {role.highlight}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              className="w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base"
              data-ocid="onboarding-continue"
            >
              Continue as{" "}
              {selectedRole
                ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                : "…"}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === "details" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card border border-border rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2">
                {selectedRole &&
                  (() => {
                    const role = roles.find((r) => r.id === selectedRole)!;
                    const Icon = role.icon;
                    return (
                      <>
                        <div className="w-7 h-7 gradient-magenta-cyan rounded-lg flex items-center justify-center">
                          <Icon size={13} className="text-white" />
                        </div>
                        <span className="font-display font-bold text-foreground capitalize">
                          {role.label}
                        </span>
                      </>
                    );
                  })()}
                <button
                  type="button"
                  onClick={() => setStep("role")}
                  className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Change role
                </button>
              </div>
            </div>

            <form
              onSubmit={handleDetailsNext}
              className="space-y-4"
              data-ocid="onboarding-form"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="username"
                  className="font-display font-semibold"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-secondary/40 border-border/60 focus:border-primary/60 h-11"
                  data-ocid="onboarding-username"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-display font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/40 border-border/60 focus:border-primary/60 h-11"
                  data-ocid="onboarding-email"
                />
              </div>

              <Button
                type="submit"
                disabled={!username.trim() || !email.trim()}
                className="w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base mt-2"
                data-ocid="onboarding-details-next"
              >
                Review Platform Agreement
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          </motion.div>
        )}

        {/* Step 3: Disclaimer */}
        {step === "disclaimer" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Document header */}
            <div className="bg-card border border-border rounded-2xl p-4 mb-4 flex items-center gap-3">
              <div className="w-9 h-9 gradient-magenta-cyan rounded-xl flex items-center justify-center shrink-0">
                <FileText size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-foreground text-sm truncate">
                  Platform Agreement &amp; Terms of Service
                </p>
                <p className="text-xs text-muted-foreground">
                  Legally binding — read carefully before proceeding
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("details")}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                Back
              </button>
            </div>

            {/* Scrollable disclaimer box */}
            <div
              className="overflow-y-auto rounded-2xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-elevated mb-5"
              style={{ maxHeight: "320px" }}
              data-ocid="disclaimer-scroll"
            >
              <div className="p-5 space-y-5">
                {disclaimerSections.map((section) => {
                  const Icon = section.icon;
                  const isWarning = section.variant === "warning";
                  const isDanger = section.variant === "danger";
                  return (
                    <div
                      key={section.id}
                      className={`rounded-xl p-4 border ${
                        isDanger
                          ? "bg-destructive/8 border-destructive/25"
                          : isWarning
                            ? "bg-accent/8 border-accent/25"
                            : "bg-primary/6 border-primary/20"
                      }`}
                    >
                      {/* Section title */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            isDanger
                              ? "bg-destructive/20"
                              : isWarning
                                ? "bg-accent/20"
                                : "bg-primary/20"
                          }`}
                        >
                          <Icon
                            size={13}
                            className={
                              isDanger
                                ? "text-destructive"
                                : isWarning
                                  ? "text-accent"
                                  : "text-primary"
                            }
                          />
                        </div>
                        <h3
                          className={`font-display font-bold text-sm ${
                            isDanger
                              ? "text-destructive"
                              : isWarning
                                ? "text-accent"
                                : "text-primary"
                          }`}
                        >
                          {section.title}
                        </h3>
                      </div>

                      {/* Paragraphs */}
                      {section.content.map((line) => (
                        <p
                          key={line}
                          className="text-xs text-foreground/90 leading-relaxed mb-1.5"
                        >
                          {line}
                        </p>
                      ))}

                      {/* Bullets */}
                      {"bullets" in section && section.bullets && (
                        <ul className="mt-2 space-y-1">
                          {section.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-xs text-foreground/85"
                            >
                              <span
                                className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isDanger ? "bg-destructive" : "bg-primary"
                                }`}
                              />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Footer note */}
                      {"footer" in section && section.footer && (
                        <p className="mt-3 text-xs font-semibold text-accent italic leading-relaxed">
                          {section.footer}
                        </p>
                      )}

                      {/* Subsections */}
                      {"subsections" in section && section.subsections && (
                        <div className="mt-3 space-y-3">
                          {section.subsections.map((sub) => (
                            <div
                              key={sub.label}
                              className="bg-destructive/10 border border-destructive/20 rounded-lg p-3"
                            >
                              <p className="text-xs font-bold text-destructive mb-1.5">
                                {sub.label}
                              </p>
                              <ul className="space-y-1">
                                {sub.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-xs text-foreground/90"
                                  >
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                                    <span className="leading-relaxed font-medium">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Scroll indicator fade */}
                <div className="h-2" />
              </div>
            </div>

            {/* Agreement checkbox */}
            <form onSubmit={handleSubmit} data-ocid="disclaimer-form">
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 mb-5 transition-smooth ${
                  agreed
                    ? "border-primary/50 bg-primary/8"
                    : "border-border bg-card"
                }`}
              >
                <Checkbox
                  id="disclaimer-agree"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(!!v)}
                  className="mt-0.5 shrink-0"
                  data-ocid="disclaimer-checkbox"
                />
                <Label
                  htmlFor="disclaimer-agree"
                  className="text-xs leading-relaxed text-foreground cursor-pointer"
                >
                  I have read and agree to the{" "}
                  <span className="font-semibold text-primary">
                    Platform Agreement &amp; Terms of Service
                  </span>
                  , including all content restrictions, financial penalties, and
                  the commandments of Emperor Yahweh (Exodus–Deuteronomy).
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!agreed || register.isPending}
                className="w-full gradient-magenta-cyan text-white border-0 h-12 font-display font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                data-ocid="onboarding-submit"
              >
                {register.isPending
                  ? "Creating your profile…"
                  : "Join YHWH Corner"}
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
