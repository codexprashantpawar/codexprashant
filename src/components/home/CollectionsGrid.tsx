import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Ethnic Wear",
    subtitle: "Traditional Elegance",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
    href: "/category/ethnic-wear",
  },
  {
    id: 2,
    title: "Western Wear",
    subtitle: "Modern Chic",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    href: "/category/western-wear",
  },
  {
    id: 3,
    title: "Sarees",
    subtitle: "Timeless Beauty",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&q=80",
    href: "/category/sarees",
  },
  {
    id: 4,
    title: "Girls Collection",
    subtitle: "Adorable Styles",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    href: "/category/girls-clothing",
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
          <h2 className="font-serif text-4xl md:text-5xl">Women's Collections</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <p className="text-primary-foreground/70 text-[10px] md:text-xs font-sans uppercase tracking-widest mb-1">
                  {collection.subtitle}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-primary-foreground mb-2">
                  {collection.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-primary-foreground text-xs font-sans uppercase tracking-wide opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
