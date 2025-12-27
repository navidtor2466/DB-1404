import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Diagrams (kept for documentation)
import ERDiagram from "./components/ERDiagram";
import EERDiagram from "./components/EERDiagram";

// Layout
import AppLayout from "./components/layout/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import NewPostPage from "./pages/NewPostPage";
import PlacesPage from "./pages/PlacesPage";
import CompanionsPage from "./pages/CompanionsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <Routes>
        {/* Documentation Routes */}
        <Route path="/eer-diagram" element={<EERDiagram />} />
        <Route path="/er-diagram" element={<ERDiagram />} />
        
        {/* Main App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="posts/:postId" element={<PostDetailPage />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="companions" element={<CompanionsPage />} />
          <Route path="companions/:requestId" element={<CompanionsPage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="settings" element={<ProfilePage />} />
        </Route>
        
        {/* Redirect root to app */}
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
