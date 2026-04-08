import { j as jsxRuntimeExports, L as Link } from "./index-CTQZhAh4.js";
import { B as Badge } from "./badge-BrNiVfWZ.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { P as Play } from "./play-DlCJeKsF.js";
import { E as Eye } from "./eye-BUtuzr9R.js";
import { C as Clock } from "./clock-s95tjnS8.js";
function formatViews(n) {
  const num = Number(n);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
}
function formatTimeAgo(ts) {
  const diff = Date.now() - Number(ts);
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
function VideoCard({ video, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.06, duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/video/$id",
          params: { id: video.id.toString() },
          "data-ocid": "video-card",
          className: "group block",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/30 mb-3", children: [
              video.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: video.thumbnailUrl,
                  alt: video.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 32, className: "text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 gradient-magenta-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-smooth shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18, className: "text-white fill-white ml-0.5" }) }) }),
              video.category && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-black/60 text-white border-0 text-xs backdrop-blur-sm",
                  children: video.category
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug", children: video.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 11 }),
                formatViews(video.viewCount),
                " views"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
                formatTimeAgo(video.createdAt)
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  VideoCard as V
};
