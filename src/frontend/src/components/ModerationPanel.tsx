import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Flag, Search, Shield, Video } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApproveUser, useFlagUser, useFlagVideo } from "../hooks/useQueries";

interface ModerationAction {
  id: string;
  type: "approve" | "flag";
  target: string;
  targetId: string;
}

function ConfirmActionDialog({
  action,
  onConfirm,
  trigger,
}: {
  action: ModerationAction;
  onConfirm: () => void;
  trigger: React.ReactNode;
}) {
  const isFlag = action.type === "flag";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display font-bold">
            {isFlag ? "Flag" : "Approve"} {action.target}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-sm">
            {isFlag
              ? `This will flag ${action.target} ID "${action.targetId}" for review. Flagged content may be hidden from other users.`
              : `This will approve ${action.target} ID "${action.targetId}", restoring normal access.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted border-border">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              isFlag
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "gradient-magenta-cyan text-white"
            }
            data-ocid="confirm-moderation-action"
          >
            {isFlag ? "Yes, Flag" : "Yes, Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function UserModeration() {
  const approveUser = useApproveUser();
  const flagUser = useFlagUser();
  const [userId, setUserId] = useState("");
  const [history, setHistory] = useState<
    { id: string; action: string; ts: string }[]
  >([
    {
      id: "demo-principal-abc123",
      action: "Flagged",
      ts: new Date().toLocaleString(),
    },
    {
      id: "demo-principal-xyz789",
      action: "Approved",
      ts: new Date().toLocaleString(),
    },
  ]);

  const doApprove = async (id: string) => {
    try {
      await approveUser.mutateAsync(id);
      toast.success("User approved successfully");
      setHistory((h) => [
        { id, action: "Approved", ts: new Date().toLocaleString() },
        ...h,
      ]);
      setUserId("");
    } catch {
      toast.error("Action failed");
    }
  };

  const doFlag = async (id: string) => {
    try {
      await flagUser.mutateAsync(id);
      toast.success("User flagged for review");
      setHistory((h) => [
        { id, action: "Flagged", ts: new Date().toLocaleString() },
        ...h,
      ]);
      setUserId("");
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-muted/40 rounded-xl p-4 border border-border">
        <p className="text-xs text-muted-foreground mb-3 font-medium">
          Enter a Principal ID to moderate:
        </p>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="user-principal-id"
              className="pl-9 bg-card border-border text-sm font-mono"
              data-ocid="user-moderation-input"
            />
          </div>
          <ConfirmActionDialog
            action={{
              id: "1",
              type: "approve",
              target: "User",
              targetId: userId,
            }}
            onConfirm={() => doApprove(userId)}
            trigger={
              <Button
                size="sm"
                variant="outline"
                disabled={!userId.trim() || approveUser.isPending}
                className="border-primary/40 text-primary hover:bg-primary/10 shrink-0"
                data-ocid="approve-user-btn"
              >
                <CheckCircle size={13} className="mr-1.5" /> Approve
              </Button>
            }
          />
          <ConfirmActionDialog
            action={{ id: "2", type: "flag", target: "User", targetId: userId }}
            onConfirm={() => doFlag(userId)}
            trigger={
              <Button
                size="sm"
                variant="outline"
                disabled={!userId.trim() || flagUser.isPending}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 shrink-0"
                data-ocid="flag-user-btn"
              >
                <Flag size={13} className="mr-1.5" /> Flag
              </Button>
            }
          />
        </div>
      </div>

      {history.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Recent Actions
          </p>
          <div className="space-y-2">
            {history.map((item, i) => (
              <div
                key={`u-${item.id}-${i}`}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/30 border border-border/50"
                data-ocid="moderation-history-row"
              >
                <span className="font-mono text-xs text-muted-foreground truncate flex-1 min-w-0 mr-3">
                  {item.id}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={
                      item.action === "Flagged" ? "destructive" : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.ts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoModeration() {
  const flagVideo = useFlagVideo();
  const [videoId, setVideoId] = useState("");
  const [history, setHistory] = useState<
    { id: string; action: string; ts: string }[]
  >([]);

  const doFlag = async (id: string) => {
    const parsed = BigInt(id.replace(/\D/g, "") || "0");
    try {
      await flagVideo.mutateAsync(parsed);
      toast.success("Video flagged for review");
      setHistory((h) => [
        { id, action: "Flagged", ts: new Date().toLocaleString() },
        ...h,
      ]);
      setVideoId("");
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-muted/40 rounded-xl p-4 border border-border">
        <p className="text-xs text-muted-foreground mb-3 font-medium">
          Enter a Video ID to flag:
        </p>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="video-id (numeric)"
              className="pl-9 bg-card border-border text-sm font-mono"
              data-ocid="video-moderation-input"
            />
          </div>
          <ConfirmActionDialog
            action={{
              id: "3",
              type: "flag",
              target: "Video",
              targetId: videoId,
            }}
            onConfirm={() => doFlag(videoId)}
            trigger={
              <Button
                size="sm"
                variant="outline"
                disabled={!videoId.trim() || flagVideo.isPending}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 shrink-0"
                data-ocid="flag-video-btn"
              >
                <Flag size={13} className="mr-1.5" /> Flag Video
              </Button>
            }
          />
        </div>
      </div>

      {history.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="empty-video-moderation"
        >
          <Video size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No video moderation actions yet</p>
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Recent Actions
          </p>
          <div className="space-y-2">
            {history.map((item, i) => (
              <div
                key={`v-${item.id}-${i}`}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted/30 border border-border/50"
                data-ocid="video-moderation-row"
              >
                <span className="font-mono text-xs text-muted-foreground truncate flex-1 min-w-0 mr-3">
                  Video #{item.id}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="destructive" className="text-xs">
                    {item.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.ts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ModerationPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          Moderation Controls
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Approve or flag users and videos across the platform.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" data-ocid="moderation-tabs">
          <TabsList className="bg-muted border border-border mb-5 h-9">
            <TabsTrigger
              value="users"
              className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground"
              data-ocid="tab-users"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground"
              data-ocid="tab-videos"
            >
              Videos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UserModeration />
          </TabsContent>
          <TabsContent value="videos">
            <VideoModeration />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
