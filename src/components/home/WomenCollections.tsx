import { Link } from "react-router-dom";

const womenImages = [
  {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    alt: "Women ethnic collection",
    link: "/category/ethnic-wear",
  },
  {
    src: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    alt: "Women saree collection",
    link: "/category/sarees",
  },
  {
    src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    alt: "Women kurti collection",
    link: "/category/kurtis",
  },
  {
    src: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    alt: "Women western wear",
    link: "/category/western-wear",
  },
];

const WomenCollections = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-center font-serif text-4xl md:text-5xl mb-12">
          <span className="text-highlight italic">Women</span> Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {womenImages.map((img, i) => (
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

export default WomenCollections;
