import { c as createLucideIcon, Z as useParams, u as useAuth, r as reactExports, a1 as LiveStreamStatus, j as jsxRuntimeExports, S as Skeleton, B as Button, L as Link, l as Video, n as Separator } from "./index-CTQZhAh4.js";
import { B as Badge } from "./badge-BrNiVfWZ.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-6fWLnLdt.js";
import { N as useGetLiveStream, O as useJoinLiveStream, P as useLeaveLiveStream } from "./useQueries-DZXfnpWg.js";
import { R as Radio } from "./radio-Dzi7SKKB.js";
import { U as Users } from "./users-DkhBDunj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode);
function formatTimestamp(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function StatusBadge({ status }) {
  if (status === LiveStreamStatus.active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "destructive",
        className: "gap-1 text-xs font-bold uppercase tracking-widest animate-pulse",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-current" }),
          "Live"
        ]
      }
    );
  }
  if (status === LiveStreamStatus.scheduled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs uppercase tracking-wide", children: "Scheduled" });
  }
  if (status === LiveStreamStatus.ended) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs uppercase tracking-wide", children: "Ended" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs uppercase tracking-wide", children: "Archived" });
}
function LiveStreamDetailPage() {
  const { id } = useParams({ from: "/live/$id" });
  const streamId = BigInt(id);
  const { data: stream, isLoading } = useGetLiveStream(streamId);
  const { isAuthenticated } = useAuth();
  const joinMutation = useJoinLiveStream();
  const leaveMutation = useLeaveLiveStream();
  const joinRef = reactExports.useRef(joinMutation.mutate);
  const leaveRef = reactExports.useRef(leaveMutation.mutate);
  joinRef.current = joinMutation.mutate;
  leaveRef.current = leaveMutation.mutate;
  reactExports.useEffect(() => {
    const isActive2 = (stream == null ? void 0 : stream.status) === LiveStreamStatus.active;
    if (isActive2 && isAuthenticated) {
      joinRef.current(streamId);
    }
    return () => {
      if (isActive2 && isAuthenticated) {
        leaveRef.current(streamId);
      }
    };
  }, [stream == null ? void 0 : stream.status, isAuthenticated, streamId]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6",
        "data-ocid": "live-detail-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" })
        ]
      }
    );
  }
  if (!stream) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center",
        "data-ocid": "live-detail-notfound",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 36, className: "text-muted-foreground/50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Stream Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 text-sm", children: "This live stream may have ended or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/live", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15, className: "mr-1.5" }),
            "Back to Live"
          ] }) })
        ]
      }
    );
  }
  const isActive = stream.status === LiveStreamStatus.active;
  const isScheduled = stream.status === LiveStreamStatus.scheduled;
  const isOver = stream.status === LiveStreamStatus.ended || stream.status === LiveStreamStatus.archived;
  const hasRecording = stream.archivedVideoId !== void 0 && stream.archivedVideoId !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6",
      "data-ocid": "live-detail-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/live",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "live-detail-back",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
              "Back to Live"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: stream.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-medium truncate", children: stream.creatorName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground break-words", children: stream.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm shrink-0",
              "data-ocid": "live-viewer-count",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  stream.viewerCount.toString(),
                  " watching"
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "aspect-video rounded-xl border border-border/40 overflow-hidden relative",
            "data-ocid": "live-player-area",
            children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-primary/20 animate-ping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 scale-125 rounded-full bg-primary/10 animate-ping [animation-delay:0.3s]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 border border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 36, className: "text-primary" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-xl", children: "Stream is Live!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Tune in — live playback is coming soon." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "destructive",
                    className: "absolute top-4 left-4 gap-1 text-xs font-bold uppercase tracking-widest animate-pulse",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-current" }),
                      "Live"
                    ]
                  }
                )
              ] }),
              isScheduled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-muted/60 flex flex-col items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 48, className: "text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Stream Starts Soon" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Scheduled for ",
                    formatTimestamp(stream.scheduledAt)
                  ] })
                ] })
              ] }),
              isOver && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-muted/60 flex flex-col items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 48, className: "text-muted-foreground/25" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-muted-foreground", children: "This stream has ended" }),
                  stream.endedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60", children: [
                    "Ended ",
                    formatTimestamp(stream.endedAt)
                  ] })
                ] })
              ] })
            ]
          }
        ),
        isOver && hasRecording && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/60",
            "data-ocid": "live-watch-recording",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { size: 18, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Recording available" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: "Watch the full stream replay" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "live-recording-link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/video/$id",
                  params: { id: stream.archivedVideoId.toString() },
                  children: "Watch Recording"
                }
              ) })
            ]
          }
        ),
        stream.description && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "live-description", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: "About this Stream" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: stream.description }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  LiveStreamDetailPage as default
};
