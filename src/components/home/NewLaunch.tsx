import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/formatPrice";
import { Skeleton } from "@/components/ui/skeleton";

const NewLaunch = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["new-launch-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("is_active", true)
        .eq("is_new", true)
        .limit(8);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-center font-serif text-4xl md:text-5xl italic mb-12">
          New Launch
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group text-center"
              >
                <div className="relative aspect-square w-full max-w-[280px] mx-auto mb-4 rounded-full overflow-hidden bg-secondary">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.stock_quantity === 0 && (
                    <span className="absolute top-4 left-4 bg-card text-foreground text-xs px-3 py-1 rounded-full border border-border">
                      Sold out
                    </span>
                  )}
                  {product.sale_price && (
                    <span className="absolute top-4 left-4 bg-highlight text-highlight-foreground text-xs px-3 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>
                <h3 className="font-sans text-sm text-foreground mb-1 group-hover:text-highlight transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {product.sale_price ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(product.sale_price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-12">
              New launches coming soon!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewLaunch;
