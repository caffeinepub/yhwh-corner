import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search, Video } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { VideoCard } from "../components/VideoCard";
import { usePublishedVideos, useSearchVideos } from "../hooks/useQueries";

const DEBOUNCE_MS = 350;

export default function SearchPage() {
  const { q } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const [inputValue, setInputValue] = useState(q ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState(q ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync from URL param
  useEffect(() => {
    setInputValue(q ?? "");
    setDebouncedQuery(q ?? "");
  }, [q]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(val.trim());
      navigate({ search: { q: val.trim() } });
    }, DEBOUNCE_MS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setDebouncedQuery(inputValue.trim());
    navigate({ search: { q: inputValue.trim() } });
  };

  const { data: searchResults = [], isLoading: isSearching } =
    useSearchVideos(debouncedQuery);
  const { data: allVideos = [], isLoading: isLoadingAll } =
    usePublishedVideos();

  const isLoading = debouncedQuery ? isSearching : isLoadingAll;
  const results = debouncedQuery ? searchResults : allVideos;

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="search-page"
    >
      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display font-black text-2xl text-foreground mb-4">
          {debouncedQuery
            ? `Results for "${debouncedQuery}"`
            : "Explore Videos"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              type="search"
              placeholder="Search videos, creators, categories…"
              value={inputValue}
              onChange={handleChange}
              className="pl-12 h-12 text-base bg-card border-border/60 focus:border-primary/60"
              data-ocid="search-input"
              autoFocus
            />
            {inputValue && (
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 gradient-magenta-cyan text-white border-0 h-8"
                data-ocid="search-submit"
              >
                Search
              </Button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Result count */}
      {!isLoading && debouncedQuery && (
        <p className="text-sm text-muted-foreground mb-5">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;
          {debouncedQuery}&rdquo;
        </p>
      )}

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
            <div key={k} className="space-y-3">
              <Skeleton className="aspect-video rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : results.length === 0 && debouncedQuery ? (
        /* No results */
        <div className="text-center py-20" data-ocid="search-no-results">
          <Video
            size={52}
            className="text-muted-foreground mx-auto mb-4 opacity-30"
          />
          <h2 className="font-display font-bold text-xl text-foreground">
            No results for &ldquo;{debouncedQuery}&rdquo;
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Try different keywords or browse all videos
          </p>
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="mt-5 border-border/60 hover:border-primary/50"
            >
              Browse all videos
            </Button>
          </Link>
        </div>
      ) : results.length === 0 && !debouncedQuery ? (
        /* Empty prompt — shouldn't normally show since we load all videos */
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="search-empty-prompt"
        >
          <Search size={48} className="mx-auto mb-4 opacity-25" />
          <p className="text-lg font-display">Start typing to search videos</p>
        </div>
      ) : (
        /* Results grid */
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          data-ocid="search-results-grid"
        >
          {results.map((video, i) => (
            <VideoCard key={video.id.toString()} video={video} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
