import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import type { CreatorPayout, ViewerRewardPayout } from "../backend.d";

type SortDir = "asc" | "desc";

function formatAmount(n: bigint): string {
  return `$${(Number(n) / 100).toFixed(2)}`;
}

function formatTs(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  if (!ms) return "—";
  return new Date(ms).toLocaleString();
}

function truncatePrincipal(id: { toText?: () => string } | string): string {
  const s = typeof id === "string" ? id : (id?.toText?.() ?? "—");
  if (s.length > 16) return `${s.slice(0, 8)}…${s.slice(-6)}`;
  return s;
}

interface SortHeaderProps {
  label: string;
  field: string;
  sortField: string;
  sortDir: SortDir;
  onSort: (field: string) => void;
}

function SortHeader({
  label,
  field,
  sortField,
  sortDir,
  onSort,
}: SortHeaderProps) {
  const active = sortField === field;
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-semibold text-xs text-muted-foreground hover:text-foreground -ml-2 px-2"
      onClick={() => onSort(field)}
    >
      {label}
      {active ? (
        sortDir === "asc" ? (
          <ChevronUp size={12} className="ml-1" />
        ) : (
          <ChevronDown size={12} className="ml-1" />
        )
      ) : (
        <ArrowUpDown size={12} className="ml-1 opacity-40" />
      )}
    </Button>
  );
}

// ─── Creator Payouts Table ────────────────────────────────────────────────────

interface CreatorPayoutsTableProps {
  data: CreatorPayout[];
  isLoading: boolean;
}

export function CreatorPayoutsTable({
  data,
  isLoading,
}: CreatorPayoutsTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = data
    .filter((p) =>
      truncatePrincipal(p.creatorId)
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let va: number;
      let vb: number;
      if (sortField === "amount") {
        va = Number(a.amount);
        vb = Number(b.amount);
      } else {
        va = Number(a.timestamp);
        vb = Number(b.timestamp);
      }
      return sortDir === "asc" ? va - vb : vb - va;
    });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-display text-base font-bold text-foreground">
          Creator Payouts
        </CardTitle>
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by creator…"
            className="pl-8 h-8 text-xs w-48 bg-muted border-border"
            data-ocid="creator-payouts-search"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {isLoading ? (
          <div className="space-y-2 px-6 pb-6">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-10 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="empty-creator-payouts"
          >
            <p className="text-sm">No creator payouts recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="creator-payouts-table">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs">Creator ID</TableHead>
                  <TableHead className="text-xs">Video ID</TableHead>
                  <TableHead className="text-xs text-right">
                    <SortHeader
                      label="Amount"
                      field="amount"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    <SortHeader
                      label="Timestamp"
                      field="timestamp"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={`cp-${truncatePrincipal(p.creatorId)}-${p.timestamp}`}
                    className="border-border hover:bg-muted/30 transition-smooth"
                    data-ocid="creator-payout-row"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(p.creatorId)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.videoId !== undefined ? String(p.videoId) : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {formatAmount(p.amount)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {formatTs(p.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Viewer Payouts Table ─────────────────────────────────────────────────────

interface ViewerPayoutsTableProps {
  data: ViewerRewardPayout[];
  isLoading: boolean;
}

export function ViewerPayoutsTable({
  data,
  isLoading,
}: ViewerPayoutsTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = data
    .filter((p) =>
      truncatePrincipal(p.viewerId)
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      let va: number;
      let vb: number;
      if (sortField === "amount") {
        va = Number(a.amount);
        vb = Number(b.amount);
      } else {
        va = Number(a.timestamp);
        vb = Number(b.timestamp);
      }
      return sortDir === "asc" ? va - vb : vb - va;
    });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-display text-base font-bold text-foreground">
          Viewer Rewards
        </CardTitle>
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by viewer…"
            className="pl-8 h-8 text-xs w-48 bg-muted border-border"
            data-ocid="viewer-payouts-search"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {isLoading ? (
          <div className="space-y-2 px-6 pb-6">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-10 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-12 text-muted-foreground"
            data-ocid="empty-viewer-payouts"
          >
            <p className="text-sm">No viewer rewards recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto" data-ocid="viewer-payouts-table">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs">Viewer ID</TableHead>
                  <TableHead className="text-xs text-right">
                    <SortHeader
                      label="Amount"
                      field="amount"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    <SortHeader
                      label="Timestamp"
                      field="timestamp"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={`vp-${truncatePrincipal(p.viewerId)}-${p.timestamp}`}
                    className="border-border hover:bg-muted/30 transition-smooth"
                    data-ocid="viewer-payout-row"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(p.viewerId)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs bg-accent/10 text-accent border-accent/20"
                      >
                        {formatAmount(p.amount)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {formatTs(p.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
