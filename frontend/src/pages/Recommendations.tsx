import { useAuth } from "@/context/AuthContext";
import { Recommendations } from "../components/Jobs/Recommendations";

export default function RecommendationsPage() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">Please login to view recommendations</p>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold text-center">AI Recommendations</h1>
        <p className="text-center text-muted-foreground text-sm">
          Based on your profile, here are some job recommendations for you by AI
        </p>
      </div>
      <Recommendations />
    </div>
  );
}
