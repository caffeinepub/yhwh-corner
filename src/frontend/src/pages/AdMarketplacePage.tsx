import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Eye, Layers, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AdPurchaseForm } from "../components/AdPurchaseForm";
import { AdSlotCard, SLOT_DEFINITIONS } from "../components/AdSlotCard";
import type { SlotType } from "../components/AdSlotCard";
import { CampaignList } from "../components/CampaignList";
import { useAdSlotPricing, useMyAdCampaigns } from "../hooks/useQueries";

const PLATFORM_HIGHLIGHTS = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "4.2M+",
    label: "Monthly Active Viewers",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    value: "28M+",
    label: "Monthly Video Impressions",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: "42 min",
    label: "Avg. Daily Watch Time",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    value: "94%",
    label: "Audience Engagement Rate",
  },
];

const VALUE_PROPS = [
  {
    icon: <BarChart3 className="w-5 h-5 text-accent" />,
    title: "Premium Audience",
    description:
      "YHWH Corner attracts high-intent viewers invested in creator content — not passive scrollers.",
  },
  {
    icon: <Eye className="w-5 h-5 text-primary" />,
    title: "Verified Viewability",
    description:
      "Every impression is verified and fraud-protected. You pay only for real human views.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
    title: "Transparent Analytics",
    description:
      "Real-time campaign dashboards. See impressions, clicks, and conversions — no black boxes.",
  },
];

export default function AdMarketplacePage() {
  const { data: pricing } = useAdSlotPricing();
  const { data: campaigns, isLoading: campaignsLoading } = useMyAdCampaigns();
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleSlotSelect(type: SlotType) {
    setSelectedSlot(type);
    setDialogOpen(true);
  }

  function handleFormSuccess() {
    setTimeout(() => setDialogOpen(false), 3200);
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="ad-marketplace">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-accent/8 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 gradient-magenta-cyan text-primary-foreground text-xs font-semibold uppercase tracking-widest px-4 py-1.5">
              Airway Time Marketplace
            </Badge>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Reach Millions of{" "}
              <span className="text-gradient-magenta">Engaged Viewers</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Premium ad placements on YHWH Corner — where passionate audiences
              watch, discover, and spend. Exclusive slots, verified impressions,
              and transparent reporting.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {PLATFORM_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="bg-muted/40 border border-border rounded-xl p-4 text-center"
                >
                  <div className="flex justify-center text-primary mb-2">
                    {h.icon}
                  </div>
                  <p className="font-display text-xl font-bold text-foreground">
                    {h.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {h.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">
        {/* ── Slot Cards ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Available Airway Time Slots
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Premium placements — limited inventory, maximum impact.
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-xs text-muted-foreground hidden sm:flex"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Slots available now
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SLOT_DEFINITIONS.map((slot, i) => (
              <AdSlotCard
                key={slot.type}
                slot={slot}
                price={pricing?.[slot.priceKey]}
                onSelect={handleSlotSelect}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── Value Props ───────────────────────────────────────────── */}
        <section className="bg-muted/30 rounded-2xl border border-border p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-2 text-center">
            Why Advertise on YHWH Corner?
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            A premium platform demands premium standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PROPS.map((vp, i) => (
              <motion.div
                key={vp.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
                  {vp.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {vp.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {vp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Campaigns Tabs ────────────────────────────────────────── */}
        <section data-ocid="campaigns-section">
          <Tabs defaultValue="campaigns">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-display text-2xl font-bold text-foreground">
                My Campaigns
              </h2>
              <TabsList>
                <TabsTrigger value="campaigns" data-ocid="tab-campaigns">
                  <Layers className="w-4 h-4 mr-1.5" />
                  All Campaigns
                </TabsTrigger>
                <TabsTrigger value="book" data-ocid="tab-book">
                  <Zap className="w-4 h-4 mr-1.5" />
                  Quick Book
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="campaigns">
              <CampaignList
                campaigns={campaigns}
                isLoading={campaignsLoading}
              />
            </TabsContent>

            <TabsContent value="book">
              <Card className="border border-border bg-card max-w-lg mx-auto">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Book a Slot Directly
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5">
                  <AdPurchaseForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>

      {/* ── Purchase Dialog ───────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-md bg-card border border-border"
          data-ocid="ad-purchase-dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg gradient-magenta-cyan flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </span>
              Book Airway Time
            </DialogTitle>
            <DialogDescription>
              Secure your premium ad placement on YHWH Corner.
            </DialogDescription>
          </DialogHeader>
          <AdPurchaseForm
            defaultSlotType={selectedSlot ?? undefined}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* ── Footer note ───────────────────────────────────────────────── */}
      <section className="bg-card border-t border-border mt-6">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            All campaigns are reviewed within 24 hours. Pricing is quoted per
            calendar day and billed upfront. Slots are subject to availability.{" "}
            <Button
              variant="link"
              className="text-accent p-0 h-auto text-sm"
              onClick={() => setDialogOpen(true)}
              data-ocid="footer-book-cta"
            >
              Ready to advertise? Book now →
            </Button>
          </p>
        </div>
      </section>
    </div>
  );
}
