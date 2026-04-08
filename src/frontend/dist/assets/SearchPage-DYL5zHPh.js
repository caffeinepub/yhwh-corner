import { a0 as useSearch, k as useNavigate, r as reactExports, j as jsxRuntimeExports, O as Search, I as Input, B as Button, S as Skeleton, l as Video, L as Link } from "./index-CTQZhAh4.js";
import { V as VideoCard } from "./VideoCard-CRBsIjmN.js";
import { I as useSearchVideos, u as usePublishedVideos } from "./useQueries-DZXfnpWg.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import "./badge-BrNiVfWZ.js";
import "./play-DlCJeKsF.js";
import "./eye-BUtuzr9R.js";
import "./clock-s95tjnS8.js";
const DEBOUNCE_MS = 350;
function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [inputValue, setInputValue] = reactExports.useState(q ?? "");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState(q ?? "");
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setInputValue(q ?? "");
    setDebouncedQuery(q ?? "");
  }, [q]);
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(val.trim());
      navigate({ search: { q: val.trim() } });
    }, DEBOUNCE_MS);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setDebouncedQuery(inputValue.trim());
    navigate({ search: { q: inputValue.trim() } });
  };
  const { data: searchResults = [], isLoading: isSearching } = useSearchVideos(debouncedQuery);
  const { data: allVideos = [], isLoading: isLoadingAll } = usePublishedVideos();
  const isLoading = debouncedQuery ? isSearching : isLoadingAll;
  const results = debouncedQuery ? searchResults : allVideos;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "search-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl text-foreground mb-4", children: debouncedQuery ? `Results for "${debouncedQuery}"` : "Explore Videos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    size: 18,
                    className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "search",
                    placeholder: "Search videos, creators, categories…",
                    value: inputValue,
                    onChange: handleChange,
                    className: "pl-12 h-12 text-base bg-card border-border/60 focus:border-primary/60",
                    "data-ocid": "search-input",
                    autoFocus: true
                  }
                ),
                inputValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "sm",
                    className: "absolute right-2 top-1/2 -translate-y-1/2 gradient-magenta-cyan text-white border-0 h-8",
                    "data-ocid": "search-submit",
                    children: "Search"
                  }
                )
              ] }) })
            ]
          }
        ),
        !isLoading && debouncedQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
          results.length,
          " result",
          results.length !== 1 ? "s" : "",
          " for “",
          debouncedQuery,
          "”"
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] }, k)) }) : results.length === 0 && debouncedQuery ? (
          /* No results */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "search-no-results", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Video,
              {
                size: 52,
                className: "text-muted-foreground mx-auto mb-4 opacity-30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground", children: [
              "No results for “",
              debouncedQuery,
              "”"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Try different keywords or browse all videos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-5 border-border/60 hover:border-primary/50",
                children: "Browse all videos"
              }
            ) })
          ] })
        ) : results.length === 0 && !debouncedQuery ? (
          /* Empty prompt — shouldn't normally show since we load all videos */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20 text-muted-foreground",
              "data-ocid": "search-empty-prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 48, className: "mx-auto mb-4 opacity-25" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display", children: "Start typing to search videos" })
              ]
            }
          )
        ) : (
          /* Results grid */
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
              "data-ocid": "search-results-grid",
              children: results.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: i }, video.id.toString()))
            }
          )
        )
      ]
    }
  );
}
export {
  SearchPage as default
};
