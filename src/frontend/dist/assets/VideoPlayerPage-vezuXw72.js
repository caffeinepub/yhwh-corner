import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, Y as X, Z as useParams, u as useAuth, S as Skeleton, L as Link } from "./index-CTQZhAh4.js";
import { B as Badge } from "./badge-BrNiVfWZ.js";
import { C as Card, c as CardContent } from "./card-6fWLnLdt.js";
import { T as Textarea } from "./textarea-CrJtNFWv.js";
import { V as VideoCard } from "./VideoCard-CRBsIjmN.js";
import { P as Progress } from "./progress-BinSFbMx.js";
import { A as AnimatePresence } from "./index-BMY7koqH.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { E as ExternalLink } from "./external-link-DqMnhYYH.js";
import { P as Play } from "./play-DlCJeKsF.js";
import { z as useVideo, a as useActiveAds, A as useRecordWatchTime, B as useGetLikeCount, C as useHasLiked, D as useToggleLike, E as useListComments, F as usePostComment, G as useRelatedVideos, H as useDeleteComment } from "./useQueries-DZXfnpWg.js";
import { E as Eye } from "./eye-BUtuzr9R.js";
import { C as Clock } from "./clock-s95tjnS8.js";
import { F as Flag } from "./flag-BrZ-DRqp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function PreRollAd({ ad, onComplete, onSkip }) {
  const COUNTDOWN = 15;
  const [timeLeft, setTimeLeft] = reactExports.useState(COUNTDOWN);
  const [canSkip, setCanSkip] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onComplete();
          return 0;
        }
        if (prev <= COUNTDOWN - 5) setCanSkip(true);
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(intervalRef.current);
  }, [onComplete]);
  const progress = (COUNTDOWN - timeLeft) / COUNTDOWN * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "absolute inset-0 z-20 flex flex-col bg-background",
      "data-ocid": "pre-roll-ad",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-semibold text-primary tracking-widest uppercase", children: "Advertisement" })
          ] }),
          ad.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ad.logoUrl,
              alt: ad.name,
              className: "h-16 w-auto object-contain rounded-lg"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-32 bg-card border border-border rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground truncate px-3", children: ad.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: ad.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm max-w-sm mx-auto", children: [
              "This video is sponsored by ",
              ad.name,
              ". Your watch time supports the creators you love."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: ad.targetUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-foreground hover:border-primary/40 transition-smooth",
              "data-ocid": "pre-roll-visit",
              children: [
                "Learn More ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 13 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-card border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-1 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: timeLeft > 0 ? `Ad ends in ${timeLeft}s` : "Ad complete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: onSkip,
                disabled: !canSkip,
                size: "sm",
                variant: "ghost",
                className: "text-xs font-semibold disabled:opacity-30 flex items-center gap-1.5",
                "data-ocid": "pre-roll-skip",
                children: canSkip ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "Skip Ad ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                ] }) : `Skip in ${5 - (COUNTDOWN - timeLeft)}s`
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const TICK_INTERVAL_MS = 3e4;
function VideoPlayer({
  video,
  preRollAd,
  onWatchTick
}) {
  const videoRef = reactExports.useRef(null);
  const tickRef = reactExports.useRef(null);
  const [adDone, setAdDone] = reactExports.useState(!preRollAd);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const onWatchTickRef = reactExports.useRef(onWatchTick);
  onWatchTickRef.current = onWatchTick;
  const startTick = reactExports.useCallback(() => {
    if (tickRef.current) return;
    tickRef.current = setInterval(() => {
      onWatchTickRef.current(30n);
    }, TICK_INTERVAL_MS);
  }, []);
  const stopTick = reactExports.useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => stopTick();
  }, [stopTick]);
  const handlePlay = () => {
    setIsPlaying(true);
    startTick();
  };
  const handlePause = () => {
    setIsPlaying(false);
    stopTick();
  };
  const handleEnded = () => {
    setIsPlaying(false);
    stopTick();
    if (videoRef.current) {
      const rem = Math.floor(videoRef.current.currentTime % 30);
      if (rem > 0) onWatchTickRef.current(BigInt(rem));
    }
  };
  const handleAdComplete = () => setAdDone(true);
  const handleAdSkip = () => setAdDone(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative aspect-video bg-background border border-border rounded-2xl overflow-hidden shadow-elevated",
      "data-ocid": "video-player-container",
      children: [
        !adDone && preRollAd && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PreRollAd,
          {
            ad: preRollAd,
            onComplete: handleAdComplete,
            onSkip: handleAdSkip
          }
        ),
        adDone && video.videoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: video.videoUrl,
            controls: true,
            className: "w-full h-full",
            poster: video.thumbnailUrl || void 0,
            onPlay: handlePlay,
            onPause: handlePause,
            onEnded: handleEnded,
            "data-ocid": "video-element",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
          }
        ),
        adDone && !video.videoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-3 bg-card", children: [
          video.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: video.thumbnailUrl,
              alt: video.title,
              className: "absolute inset-0 w-full h-full object-cover opacity-30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-20 h-20 gradient-magenta-cyan rounded-full flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 28, className: "text-white fill-white ml-2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 text-muted-foreground text-sm", children: "Video coming soon" })
        ] }),
        adDone && isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-background/70 backdrop-blur-sm rounded-full border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent", children: "Earning rewards" })
        ] })
      ]
    }
  );
}
function SidebarAd({ ad }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: ad.targetUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "block group",
      "data-ocid": "sidebar-ad",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/40 transition-smooth", children: [
        ad.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: ad.logoUrl,
            alt: ad.name,
            className: "w-10 h-10 rounded-lg object-contain flex-shrink-0 bg-muted"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: ad.name[0] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors", children: ad.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Sponsored" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExternalLink,
          {
            size: 11,
            className: "text-muted-foreground flex-shrink-0"
          }
        )
      ] })
    }
  );
}
function formatTimeAgo(ts) {
  const diff = Date.now() - Number(ts);
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
function CommentItem({
  comment,
  videoCreatorId,
  currentUserId,
  videoId
}) {
  var _a, _b;
  const deleteComment = useDeleteComment();
  const canDelete = currentUserId && (currentUserId === comment.authorId.toString() || currentUserId === videoCreatorId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 group", "data-ocid": "comment-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: ((_b = (_a = comment.authorName) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) ?? "?" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: comment.authorName ?? "Anonymous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: formatTimeAgo(comment.createdAt) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed break-words", children: comment.text })
    ] }),
    canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Delete comment",
        className: "opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1 rounded",
        "data-ocid": "comment-delete",
        onClick: () => deleteComment.mutate({ commentId: comment.id, videoId }),
        disabled: deleteComment.isPending,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
      }
    )
  ] });
}
function CommentsSection({
  videoId,
  videoCreatorId,
  currentUserId,
  isAuthenticated,
  onLoginClick
}) {
  const { data: comments, isLoading } = useListComments(videoId);
  const postComment = usePostComment();
  const [text, setText] = reactExports.useState("");
  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    postComment.mutate(
      { videoId, text: trimmed },
      { onSuccess: () => setText("") }
    );
  };
  const visible = (comments ?? []).filter((c) => !c.isDeleted);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "comments-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-2", children: [
      "Comments",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full", children: visible.length })
    ] }),
    isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: "You" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Share your thoughts...",
            value: text,
            onChange: (e) => setText(e.target.value),
            className: "resize-none text-sm bg-card border-border/60 focus:border-primary/60 min-h-[72px]",
            "data-ocid": "comment-input",
            onKeyDown: (e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                handleSubmit();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gradient-magenta-cyan text-white border-0 font-display font-semibold",
            onClick: handleSubmit,
            disabled: !text.trim() || postComment.isPending,
            "data-ocid": "comment-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 12, className: "mr-1.5" }),
              postComment.isPending ? "Posting…" : "Post"
            ]
          }
        ) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 px-4 py-3 bg-card border border-border/50 rounded-xl",
        "data-ocid": "comment-login-prompt",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground flex-1", children: "Sign in to leave a comment." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "border-primary/40 text-primary hover:bg-primary/5 font-display font-semibold",
              onClick: onLoginClick,
              children: "Sign in"
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
      ] })
    ] }, k)) }) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", "data-ocid": "comments-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No comments yet. Be the first to share your thoughts!" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: visible.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItem,
      {
        comment,
        videoCreatorId,
        currentUserId,
        videoId
      },
      String(comment.id)
    )) })
  ] });
}
function LikeButton({
  videoId,
  isAuthenticated,
  onLoginClick
}) {
  const { data: likeCount = 0n } = useGetLikeCount(videoId);
  const { data: hasLiked = false } = useHasLiked(videoId);
  const toggleLike = useToggleLike();
  const handleClick = () => {
    if (!isAuthenticated) {
      onLoginClick();
      return;
    }
    toggleLike.mutate(videoId);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      className: `border-border/60 gap-1.5 transition-smooth ${hasLiked ? "border-primary/60 text-primary bg-primary/5 hover:bg-primary/10" : "hover:border-primary/40 hover:text-primary"}`,
      onClick: handleClick,
      disabled: toggleLike.isPending,
      "data-ocid": "video-like",
      "aria-label": hasLiked ? "Unlike video" : "Like video",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            size: 13,
            className: hasLiked ? "fill-primary text-primary" : ""
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Number(likeCount).toLocaleString() })
      ]
    }
  );
}
function RelatedVideosSidebar({ videoId }) {
  const { data: related, isLoading } = useRelatedVideos(videoId, 5n);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "related-videos", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 px-1", children: "Related Videos" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] }, k)) }) : !related || related.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-sm text-muted-foreground text-center py-6",
        "data-ocid": "related-videos-empty",
        children: "No related videos found"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: related.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video: v, index: i }, String(v.id))) })
  ] });
}
function VideoPlayerPage() {
  const { id } = useParams({ from: "/video/$id" });
  const videoId = BigInt(id);
  const { data: video, isLoading } = useVideo(videoId);
  const { data: allAds } = useActiveAds();
  const recordWatch = useRecordWatchTime();
  const { isAuthenticated, login, identity } = useAuth();
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const [reported, setReported] = reactExports.useState(false);
  const currentUserId = identity == null ? void 0 : identity.getPrincipal().toString();
  const preRollAds = (allAds == null ? void 0 : allAds.filter((a) => a.slotType === "pre_roll" && a.isActive)) ?? [];
  const sidebarAds = (allAds == null ? void 0 : allAds.filter((a) => a.slotType === "sidebar" && a.isActive)) ?? [];
  const preRollAd = preRollAds[0] ?? null;
  const handleWatchTick = reactExports.useCallback(
    (seconds) => {
      recordWatch.mutate({ videoId, seconds });
    },
    [videoId, recordWatch]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6",
        "data-ocid": "video-player-loading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, k)) })
        ]
      }
    );
  }
  if (!video) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-24 text-center",
        "data-ocid": "video-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 32, className: "text-muted-foreground opacity-40 ml-1" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Video Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "This video may have been removed or is unavailable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 gradient-magenta-cyan text-white border-0 font-display font-semibold", children: "Back to Home" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      "data-ocid": "video-player-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "lg:col-span-2 space-y-5",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                VideoPlayer,
                {
                  video,
                  preRollAd,
                  onWatchTick: handleWatchTick
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-xl sm:text-2xl text-foreground leading-tight flex-1 min-w-0", children: video.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LikeButton,
                    {
                      videoId,
                      isAuthenticated,
                      onLoginClick: login
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14 }),
                      " ",
                      Number(video.viewCount).toLocaleString(),
                      " ",
                      "views"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                      " ",
                      Math.round(Number(video.totalWatchSeconds) / 60),
                      "m watched"
                    ] }),
                    video.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: video.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        className: "border-border/60 hover:border-primary/40",
                        "data-ocid": "video-share",
                        onClick: () => {
                          navigator.clipboard.writeText(window.location.href);
                          setLinkCopied(true);
                          setTimeout(() => setLinkCopied(false), 3e3);
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 13, className: "mr-1.5" }),
                          linkCopied ? "Link copied!" : "Share"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "text-muted-foreground hover:text-destructive",
                        "data-ocid": "video-flag",
                        "aria-label": "Report video",
                        onClick: () => setReported(true),
                        children: reported ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Reported" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { size: 13 })
                      }
                    )
                  ] })
                ] })
              ] }),
              video.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: video.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs text-muted-foreground",
                  children: [
                    "#",
                    tag
                  ]
                },
                tag
              )) }),
              video.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: video.description }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-accent/5 border border-accent/20 rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent flex-shrink-0 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "You're earning!" }),
                  " ",
                  "Watch time is tracked every 30 seconds. Claim your daily rewards on the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/rewards",
                      className: "underline underline-offset-2 hover:text-accent transition-colors",
                      children: "Rewards dashboard"
                    }
                  ),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CommentsSection,
                {
                  videoId,
                  videoCreatorId: video.creatorId.toString(),
                  currentUserId,
                  isAuthenticated,
                  onLoginClick: login
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.aside,
          {
            className: "space-y-6",
            initial: { opacity: 0, x: 16 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.1 },
            "data-ocid": "video-sidebar",
            children: [
              sidebarAds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 px-1", children: "Sponsored" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sidebarAds.slice(0, 4).map((ad) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarAd, { ad }, String(ad.id))) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rewards", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-4 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/25 rounded-xl cursor-pointer hover:border-primary/50 transition-smooth",
                  "data-ocid": "sidebar-reward-cta",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 gradient-magenta-cyan rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs", children: "💎" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground", children: "Earn While Watching" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Every hour you watch earns you 1% of platform revenue. Check your rewards dashboard →" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedVideosSidebar, { videoId })
            ]
          }
        )
      ] })
    }
  );
}
export {
  VideoPlayerPage as default
};
