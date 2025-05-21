import { Recommendations } from "../components/Jobs/Recommendations";

export default function RecommendationsPage() {
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
