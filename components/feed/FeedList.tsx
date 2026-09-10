import { feedItems } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";
import { SocialCard } from "./SocialCard";

export function FeedList() {
  return (
    <div className="flex flex-col divide-y divide-graphite-line/50">
      {feedItems.map((item) =>
        item.type === "product" ? (
          <ProductCard key={item.id} item={item} />
        ) : (
          <SocialCard key={item.id} item={item} />
        )
      )}
    </div>
  );
}
