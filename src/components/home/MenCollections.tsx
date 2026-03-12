import { Link } from "react-router-dom";

const menImages = [
  {
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80",
    alt: "Men kurta collection",
    link: "/category/men-kurta",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    alt: "Men shirts collection",
    link: "/category/men-shirts",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    alt: "Men ethnic wear",
    link: "/category/men-ethnic",
  },
  {
    src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80",
    alt: "Men casual wear",
    link: "/category/men-casual",
  },
];

const MenCollections = () => {
  return (
    <section className="py-16 bg-highlight/5">
      <div className="container">
        <h2 className="text-center font-serif text-4xl md:text-5xl mb-12">
          <span className="text-highlight italic">Men</span> Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {menImages.map((img, i) => (
            <Link
              key={i}
              to={img.link}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenCollections;
