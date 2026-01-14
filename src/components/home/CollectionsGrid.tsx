import { Link } from "react-router-dom";
import collectionWomen from "@/assets/collection-women.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionAccessories from "@/assets/collection-accessories.jpg";

const collections = [
  {
    id: 1,
    title: "Women",
    subtitle: "Contemporary Elegance",
    image: collectionWomen,
    href: "/women",
  },
  {
    id: 2,
    title: "Men",
    subtitle: "Modern Refinement",
    image: collectionMen,
    href: "/men",
  },
  {
    id: 3,
    title: "Accessories",
    subtitle: "Finishing Touches",
    image: collectionAccessories,
    href: "/accessories",
  },
];

const CollectionsGrid = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-xs font-sans uppercase tracking-ultra mb-3">
            Shop by Category
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Our Collections</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.href}
              className="group relative aspect-[3/4] overflow-hidden bg-secondary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover img-zoom"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-primary-foreground/70 text-xs font-sans uppercase tracking-widest mb-2">
                  {collection.subtitle}
                </p>
                <h3 className="font-serif text-3xl text-primary-foreground mb-4">
                  {collection.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-primary-foreground text-sm font-sans uppercase tracking-wide opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
