import type { CreatorPayout, ViewerRewardPayout } from "../backend.d";
import { CreatorPayoutsTable, ViewerPayoutsTable } from "./PayoutsTable";

interface PayoutsSectionProps {
  creatorPayouts: CreatorPayout[];
  viewerPayouts: ViewerRewardPayout[];
  creatorLoading: boolean;
  viewerLoading: boolean;
}

export function PayoutsSection({
  creatorPayouts,
  viewerPayouts,
  creatorLoading,
  viewerLoading,
}: PayoutsSectionProps) {
  return (
    <div className="space-y-6">
      <CreatorPayoutsTable data={creatorPayouts} isLoading={creatorLoading} />
      <ViewerPayoutsTable data={viewerPayouts} isLoading={viewerLoading} />
    </div>
  );
}
