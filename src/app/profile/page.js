import { Suspense } from "react";
import ProfileDashboard from "./ProfileDashboard";

export const metadata = {
  title: "Member Workspace | AyuPlanet",
  description: "Access your AyuPlanet member profile, review order history, manage shipping locations, and view saved items inside your personalized Ayurvedic workspace.",
};

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-sage-bg/30">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-terracotta"></div>
            <p className="font-label-lg text-deep-forest animate-pulse">Loading Member Workspace...</p>
          </div>
        </div>
      }
    >
      <ProfileDashboard />
    </Suspense>
  );
}
