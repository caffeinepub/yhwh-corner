import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const CreatorDashboardPage = lazy(() => import("./pages/CreatorDashboardPage"));
const RewardsPage = lazy(() => import("./pages/RewardsPage"));
const AdMarketplacePage = lazy(() => import("./pages/AdMarketplacePage"));
const AdminPanelPage = lazy(() => import("./pages/AdminPanelPage"));
const VideoPlayerPage = lazy(() => import("./pages/VideoPlayerPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LiveStreamPage = lazy(() => import("./pages/LiveStreamPage"));
const LiveStreamDetailPage = lazy(() => import("./pages/LiveStreamDetailPage"));

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid grid-cols-4 gap-4">
        {["a", "b", "c", "d"].map((k) => (
          <Skeleton key={k} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

const creatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/creator",
  component: CreatorDashboardPage,
});

const rewardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rewards",
  component: RewardsPage,
});

const advertiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advertise",
  component: AdMarketplacePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanelPage,
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video/$id",
  component: VideoPlayerPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search: Record<string, unknown>) => ({
    q: String(search.q ?? ""),
  }),
  component: SearchPage,
});

const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live",
  component: LiveStreamPage,
});

const liveDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$id",
  component: LiveStreamDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  creatorRoute,
  rewardsRoute,
  advertiseRoute,
  adminRoute,
  videoRoute,
  searchRoute,
  liveRoute,
  liveDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
