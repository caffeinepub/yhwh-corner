import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdSlotPricing, usePurchaseAdSlot } from "../hooks/useQueries";
import type { SlotType } from "./AdSlotCard";

const SLOT_LABELS: Record<SlotType, string> = {
  homepage_banner: "Homepage Banner — $500/day",
  pre_roll: "Pre-Roll Video Ad — $300/day",
  sidebar: "Sidebar Placement — $150/day",
};

const SLOT_PRICES_FALLBACK: Record<SlotType, number> = {
  homepage_banner: 500,
  pre_roll: 300,
  sidebar: 150,
};

interface ValidationErrors {
  name?: string;
  logoUrl?: string;
  targetUrl?: string;
  slotType?: string;
  durationDays?: string;
}

interface AdPurchaseFormProps {
  defaultSlotType?: SlotType;
  onSuccess?: () => void;
}

export function AdPurchaseForm({
  defaultSlotType,
  onSuccess,
}: AdPurchaseFormProps) {
  const { data: pricing } = useAdSlotPricing();
  const purchase = usePurchaseAdSlot();
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    logoUrl: "",
    targetUrl: "",
    slotType: defaultSlotType ?? ("" as SlotType | ""),
    durationDays: 7,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const getPricePerDay = (type: SlotType | ""): number => {
    if (!type) return 0;
    if (pricing) {
      const pricingMap = new Map(pricing);
      const price = pricingMap.get(type as import("../backend").AdSlotType);
      if (price !== undefined) return Number(price);
    }
    return SLOT_PRICES_FALLBACK[type];
  };

  const totalCost = form.slotType
    ? getPricePerDay(form.slotType) * form.durationDays
    : 0;

  function validate(): boolean {
    const errs: ValidationErrors = {};
    if (!form.name.trim()) errs.name = "Campaign name is required.";
    if (form.name.trim().length > 80)
      errs.name = "Campaign name must be under 80 characters.";
    if (!form.logoUrl.trim()) errs.logoUrl = "Logo URL is required.";
    else if (!/^https?:\/\/.+/.test(form.logoUrl))
      errs.logoUrl = "Must be a valid URL starting with https://";
    if (!form.targetUrl.trim()) errs.targetUrl = "Destination URL is required.";
    else if (!/^https?:\/\/.+/.test(form.targetUrl))
      errs.targetUrl = "Must be a valid URL starting with https://";
    if (!form.slotType) errs.slotType = "Please select an ad slot.";
    if (form.durationDays < 1 || form.durationDays > 365)
      errs.durationDays = "Duration must be between 1 and 365 days.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await purchase.mutateAsync({
        name: form.name,
        logoUrl: form.logoUrl,
        targetUrl: form.targetUrl,
        slotType: form.slotType as import("../backend").AdSlotType,
        durationDays: BigInt(form.durationDays),
      });
      setSuccess(true);
      toast.success("Campaign booked! Your ad will go live within 24 hours.");
      onSuccess?.();
    } catch {
      toast.error("Failed to book campaign. Please try again.");
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 gap-5 text-center"
      >
        <div className="w-16 h-16 rounded-full gradient-magenta-cyan flex items-center justify-center shadow-elevated">
          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            Campaign Booked!
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Your ad is under review and will go live within 24 hours.
          </p>
        </div>
        <div className="bg-muted/40 rounded-xl p-4 w-full max-w-sm border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Summary
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Campaign</span>
            <span className="font-semibold text-foreground">{form.name}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Slot</span>
            <span className="font-semibold text-foreground">
              {SLOT_LABELS[form.slotType as SlotType]?.split(" —")[0]}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-semibold text-foreground">
              {form.durationDays} days
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Total Spent</span>
            <span className="font-bold text-gradient-magenta font-display">
              ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSuccess(false);
            setForm({
              name: "",
              logoUrl: "",
              targetUrl: "",
              slotType: "",
              durationDays: 7,
            });
          }}
        >
          Book Another Slot
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="ad-purchase-form"
    >
      {/* Campaign Name */}
      <div className="space-y-1.5">
        <Label htmlFor="camp-name" className="text-sm font-semibold">
          Campaign Name
        </Label>
        <Input
          id="camp-name"
          data-ocid="ad-campaign-name"
          placeholder="e.g. Summer 2026 Launch"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          onBlur={validate}
          className={errors.name ? "border-destructive" : ""}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Logo URL */}
      <div className="space-y-1.5">
        <Label htmlFor="logo-url" className="text-sm font-semibold">
          Brand Logo URL
        </Label>
        <Input
          id="logo-url"
          data-ocid="ad-logo-url"
          placeholder="https://yourbrand.com/logo.png"
          value={form.logoUrl}
          onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
          onBlur={validate}
          className={errors.logoUrl ? "border-destructive" : ""}
        />
        <AnimatePresence>
          {errors.logoUrl && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.logoUrl}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Destination URL */}
      <div className="space-y-1.5">
        <Label htmlFor="target-url" className="text-sm font-semibold">
          Destination URL
        </Label>
        <Input
          id="target-url"
          data-ocid="ad-target-url"
          placeholder="https://yourbrand.com/campaign"
          value={form.targetUrl}
          onChange={(e) =>
            setForm((f) => ({ ...f, targetUrl: e.target.value }))
          }
          onBlur={validate}
          className={errors.targetUrl ? "border-destructive" : ""}
        />
        <AnimatePresence>
          {errors.targetUrl && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.targetUrl}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Slot Type */}
      <div className="space-y-1.5">
        <Label className="text-sm font-semibold">Ad Slot</Label>
        <Select
          value={form.slotType}
          onValueChange={(v) =>
            setForm((f) => ({ ...f, slotType: v as SlotType }))
          }
        >
          <SelectTrigger
            data-ocid="ad-slot-select"
            className={errors.slotType ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select an airway time slot" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SLOT_LABELS) as SlotType[]).map((type) => (
              <SelectItem key={type} value={type}>
                {SLOT_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <AnimatePresence>
          {errors.slotType && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.slotType}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Duration */}
      <div className="space-y-1.5">
        <Label htmlFor="duration" className="text-sm font-semibold">
          Duration (days)
        </Label>
        <Input
          id="duration"
          type="number"
          data-ocid="ad-duration-days"
          min={1}
          max={365}
          value={form.durationDays}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              durationDays: Math.max(1, Number.parseInt(e.target.value) || 1),
            }))
          }
          onBlur={validate}
          className={errors.durationDays ? "border-destructive" : ""}
        />
        <AnimatePresence>
          {errors.durationDays && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-destructive flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.durationDays}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Price calculator */}
      <AnimatePresence>
        {form.slotType && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/40 border border-border rounded-xl p-4 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                Cost Estimate
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate per day</span>
                <span className="font-semibold">
                  ${getPricePerDay(form.slotType).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold">{form.durationDays} days</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">
                  Total Investment
                </span>
                <span className="text-xl font-bold font-display text-gradient-magenta">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Billing is processed upfront. Campaigns go live within 24 hours
                of review.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        data-ocid="ad-submit-purchase"
        disabled={purchase.isPending}
        className="w-full gradient-magenta-cyan text-primary-foreground font-bold text-base py-5 transition-smooth hover:opacity-90"
      >
        {purchase.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Book Airway Time — ${totalCost.toLocaleString()}
          </>
        )}
      </Button>
    </form>
  );
}
