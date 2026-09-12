"use client";

import { useEffect, useState } from "react";
import { feedItems } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";
import { SocialCard } from "./SocialCard";
import { FeedSkeleton } from "./FeedSkeleton";
import { FeedEmptyState } from "./FeedEmptyState";

export function FeedList() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <FeedSkeleton />;
  if (feedItems.length === 0) return <FeedEmptyState />;

  return (
    <div className="flex flex-col divide-y divide-graphite-line/50">
      {feedItems.map((item) =>
        item.type === "PRODUCT_POST" ? (
          <ProductCard key={item.id} item={item} />
        ) : (
          <SocialCard key={item.id} item={item} />
        )
      )}
    </div>
  );
}
