import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Category = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [slug, sortBy]);

  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    
    // Fetch category
    const { data: catData } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    
    setCategory(catData);

    if (catData) {
      // Fetch products
      let query = supabase
        .from("products")
        .select(`*, categories(name, slug)`)
        .eq("is_active", true)
        .eq("category_id", catData.id);

      switch (sortBy) {
        case "price-low":
          query = query.order("price", { ascending: true });
          break;
        case "price-high":
          query = query.order("price", { ascending: false });
          break;
        case "name":
          query = query.order("name");
          break;
        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data } = await query;
      setProducts(data?.map(p => ({ ...p, category: p.categories })) || []);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <div className="bg-secondary py-12 md:py-16">
          <div className="container text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              {category?.name || "Category"}
            </h1>
            {category?.description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="container py-8 md:py-12">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {products.length} products
            </p>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
