import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { analyticsEnabled, posthog } from "./lib/analytics";
import { AboutPage, HomePage, MorePage, ProjectDetailPage, WorkPage } from "./pages";

function PageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!analyticsEnabled) return;
    posthog.capture("$pageview");
  }, [location.pathname, location.search]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <PageviewTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<ProjectDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
