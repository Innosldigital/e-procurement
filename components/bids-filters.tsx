"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  statusFilter: string;
  categoryFilter: string;
  uniqueStatuses: string[];
  uniqueCategories: string[];
  sortParam: string;
  orderParam: string;
  searchQuery: string;
};

export default function BidsFilters({
  statusFilter,
  categoryFilter,
  uniqueStatuses,
  uniqueCategories,
  sortParam,
  orderParam,
  searchQuery,
}: Props) {
  function buildUrl(updates: Record<string, string>) {
    const params = new URLSearchParams();
    const merged = {
      sort: sortParam,
      order: orderParam,
      page: "1",
      ...(searchQuery && { search: searchQuery }),
      ...(statusFilter && { status: statusFilter }),
      ...(categoryFilter && { category: categoryFilter }),
      ...updates,
    } as Record<string, string>;
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    return `/bids?${params.toString()}`;
  }

  return (
    <>
      <Select
        value={statusFilter}
        onValueChange={(value) => {
          const url = buildUrl({ status: value === "all" ? "" : value });
          window.location.href = url;
        }}
      >
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {uniqueStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={categoryFilter}
        onValueChange={(value) => {
          const url = buildUrl({ category: value === "all" ? "" : value });
          window.location.href = url;
        }}
      >
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {uniqueCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}