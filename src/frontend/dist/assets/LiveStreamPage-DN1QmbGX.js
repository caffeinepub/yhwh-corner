import { c as createLucideIcon, a as useCurrentUser, U as UserRole, a1 as LiveStreamStatus, j as jsxRuntimeExports, B as Button, L as Link, r as reactExports, I as Input, l as Video, S as Skeleton, m as ue } from "./index-CTQZhAh4.js";
import { B as Badge } from "./badge-BrNiVfWZ.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-6fWLnLdt.js";
import { D as Dialog, e as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CgXHlxRa.js";
import { L as Label } from "./label-BB2fwEXE.js";
import { T as Textarea } from "./textarea-CrJtNFWv.js";
import { b as useActiveLiveStreams, J as useStartLiveStream, K as useGoLive, L as useEndLiveStream, M as useArchiveLiveStream } from "./useQueries-DZXfnpWg.js";
import { R as Radio } from "./radio-Dzi7SKKB.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { C as Calendar } from "./calendar-B3Wp7lu4.js";
import { U as Users } from "./users-DkhBDunj.js";
import { C as Clock } from "./clock-s95tjnS8.js";
import "./index-B07Xy8pm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
function StatusBadge({ status }) {
  if (status === LiveStreamStatus.active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wide animate-pulse", children: "● LIVE" });
  }
  if (status === LiveStreamStatus.scheduled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-bold uppercase tracking-wide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 10, className: "mr-1" }),
      "SCHEDULED"
    ] });
  }
  return null;
}
function LiveStreamCard({ stream }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/live/$id",
      params: { id: stream.id.toString() },
      "data-ocid": `live-card-${stream.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden hover:border-primary/50 transition-smooth cursor-pointer group shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted/60 flex items-center justify-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radio,
            {
              size: 40,
              className: "text-primary/30 group-hover:text-primary/60 transition-colors duration-300"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: stream.status }) }),
          stream.status === LiveStreamStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded px-2 py-0.5 text-xs text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stream.viewerCount.toString() })
          ] }),
          stream.status === LiveStreamStatus.scheduled && stream.scheduledAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded px-2 py-0.5 text-xs text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(
              Number(stream.scheduledAt) / 1e6
            ).toLocaleDateString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors", children: stream.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: stream.creatorName }),
          stream.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: stream.description })
        ] })
      ] })
    }
  );
}
function CreatorStreamRow({ stream }) {
  const goLive = useGoLive();
  const endStream = useEndLiveStream();
  const archiveStream = useArchiveLiveStream();
  const [archiveUrl, setArchiveUrl] = reactExports.useState("");
  const [archiveOpen, setArchiveOpen] = reactExports.useState(false);
  const handleGoLive = () => {
    goLive.mutate(stream.id, {
      onSuccess: () => ue.success("You are now live!"),
      onError: (e) => ue.error(e instanceof Error ? e.message : "Failed to go live")
    });
  };
  const handleEnd = () => {
    endStream.mutate(stream.id, {
      onSuccess: () => ue.success("Stream ended."),
      onError: (e) => ue.error(e instanceof Error ? e.message : "Failed to end stream")
    });
  };
  const handleArchive = () => {
    if (!archiveUrl.trim()) {
      ue.error("Enter a video URL to save.");
      return;
    }
    archiveStream.mutate(
      { streamId: stream.id, videoUrl: archiveUrl },
      {
        onSuccess: () => {
          ue.success("Stream saved as video!");
          setArchiveOpen(false);
          setArchiveUrl("");
        },
        onError: (e) => ue.error(e instanceof Error ? e.message : "Failed to archive")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border/60 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col sm:flex-row sm:items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 18, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: stream.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: stream.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: stream.description || "No description" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap shrink-0", children: [
      stream.status === LiveStreamStatus.scheduled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: handleGoLive,
          disabled: goLive.isPending,
          "data-ocid": "btn-go-live",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 14, className: "mr-1" }),
            goLive.isPending ? "Starting…" : "Go Live Now"
          ]
        }
      ),
      stream.status === LiveStreamStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "destructive",
          onClick: handleEnd,
          disabled: endStream.isPending,
          "data-ocid": "btn-end-stream",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 14, className: "mr-1" }),
            endStream.isPending ? "Ending…" : "End Stream"
          ]
        }
      ),
      stream.status === LiveStreamStatus.ended && /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: archiveOpen, onOpenChange: setArchiveOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            "data-ocid": "btn-archive-stream",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 14, className: "mr-1" }),
              "Save as Video"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Save Stream as Video" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "archive-url", children: "Video URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "archive-url",
                  placeholder: "https://example.com/recording.mp4",
                  value: archiveUrl,
                  onChange: (e) => setArchiveUrl(e.target.value),
                  "data-ocid": "input-archive-url"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter the URL of the recorded stream." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleArchive,
                disabled: archiveStream.isPending,
                className: "w-full",
                "data-ocid": "btn-confirm-archive",
                children: archiveStream.isPending ? "Saving…" : "Save Video"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live/$id", params: { id: stream.id.toString() }, children: "View" }) })
    ] })
  ] }) });
}
function GoLiveDialog() {
  const startLiveStream = useStartLiveStream();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    scheduledAt: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      ue.error("Title is required.");
      return;
    }
    const schedTs = form.scheduledAt ? BigInt(new Date(form.scheduledAt).getTime()) * 1000000n : BigInt(Date.now()) * 1000000n;
    startLiveStream.mutate(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        scheduledAt: schedTs
      },
      {
        onSuccess: () => {
          ue.success("Live stream created!");
          setOpen(false);
          setForm({ title: "", description: "", scheduledAt: "" });
        },
        onError: (e2) => ue.error(
          e2 instanceof Error ? e2.message : "Failed to create stream"
        )
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "btn-open-go-live", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 16, className: "mr-2" }),
      "Go Live"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Start a Live Stream" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stream-title", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "stream-title",
              placeholder: "Give your stream a title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              "data-ocid": "input-stream-title",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stream-description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "stream-description",
              placeholder: "What will you be streaming about?",
              value: form.description,
              onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
              "data-ocid": "input-stream-description",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "stream-scheduled", children: "Scheduled For (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "stream-scheduled",
              type: "datetime-local",
              value: form.scheduledAt,
              onChange: (e) => setForm((f) => ({ ...f, scheduledAt: e.target.value })),
              "data-ocid": "input-stream-scheduled"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Leave blank to start immediately." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: startLiveStream.isPending,
            "data-ocid": "btn-submit-stream",
            children: startLiveStream.isPending ? "Creating…" : "Create Stream"
          }
        )
      ] })
    ] })
  ] });
}
function LiveStreamSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] })
  ] });
}
function LiveStreamPage() {
  const { data: streams, isLoading } = useActiveLiveStreams();
  const { user } = useCurrentUser();
  const isCreator = (user == null ? void 0 : user.role) === UserRole.creator;
  const activeStreams = (streams == null ? void 0 : streams.filter((s) => s.status === LiveStreamStatus.active)) ?? [];
  const scheduledStreams = (streams == null ? void 0 : streams.filter((s) => s.status === LiveStreamStatus.scheduled)) ?? [];
  const myStreams = (streams == null ? void 0 : streams.filter((s) => user && s.creatorId.toText() === user.id.toText())) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "live-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col sm:flex-row sm:items-end gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 28, className: "text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Live Streams" }),
              activeStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive text-destructive-foreground animate-pulse text-xs font-bold", children: [
                activeStreams.length,
                " LIVE"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xl", children: "Watch anointed creators broadcasting in real time on YHWH Corner." })
          ] }),
          isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx(GoLiveDialog, {})
        ] }),
        isCreator && myStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", "data-ocid": "creator-streams-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-primary/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 16, className: "text-primary" }),
            "Your Streams"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3 pt-0", children: myStreams.map((stream) => /* @__PURE__ */ jsxRuntimeExports.jsx(CreatorStreamRow, { stream }, stream.id.toString())) })
        ] }) }),
        isCreator && !isLoading && myStreams.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-10 p-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-center gap-4",
            "data-ocid": "creator-empty-own",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 36, className: "text-primary/50 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "You have no live streams" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Go live to reach your audience and spread the word!" })
              ] })
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-4", children: "Live Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStreamSkeleton, {}, k)) })
        ] }) : activeStreams.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "active-streams-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-destructive animate-pulse" }),
            "Live Now"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: activeStreams.map((stream, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07, duration: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStreamCard, { stream })
            },
            stream.id.toString()
          )) })
        ] }) : null,
        !isLoading && scheduledStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "scheduled-streams-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "text-yellow-400" }),
            "Coming Up"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: scheduledStreams.map((stream, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 + 0.1, duration: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStreamCard, { stream })
            },
            stream.id.toString()
          )) })
        ] }),
        !isLoading && activeStreams.length === 0 && scheduledStreams.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "live-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted/60 border border-border flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 36, className: "text-muted-foreground/40" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No Live Streams Right Now" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6", children: isCreator ? "You have no live streams. Go live to reach your audience!" : "No creators are broadcasting at the moment. Check back soon!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
                isCreator && /* @__PURE__ */ jsxRuntimeExports.jsx(GoLiveDialog, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Browse Videos" }) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  LiveStreamPage as default
};
