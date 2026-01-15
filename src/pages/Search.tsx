import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query, sortBy]);

  const searchProducts = async () => {
    setLoading(true);

    let queryBuilder = supabase
      .from("products")
      .select(`*, categories(name, slug)`)
      .eq("is_active", true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    switch (sortBy) {
      case "price-low":
        queryBuilder = queryBuilder.order("price", { ascending: true });
        break;
      case "price-high":
        queryBuilder = queryBuilder.order("price", { ascending: false });
        break;
      case "newest":
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
        break;
      default:
        queryBuilder = queryBuilder.order("is_featured", { ascending: false });
    }

    const { data } = await queryBuilder;
    setProducts(data?.map(p => ({ ...p, category: p.categories })) || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Search Header */}
        <div className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <SearchIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h1 className="font-serif text-3xl md:text-4xl mb-4">
              {query ? `Search Results for "${query}"` : "Search Products"}
            </h1>
            <p className="text-muted-foreground">
              {loading ? "Searching..." : `${products.length} products found`}
            </p>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          {query && (
            <>
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-muted-foreground">
                  {products.length} results
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ProductGrid products={products} loading={loading} />
            </>
          )}

          {!query && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Enter a search term to find products
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
