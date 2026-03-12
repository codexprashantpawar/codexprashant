import { Link } from "react-router-dom";

const images = [
  {
    src: "https://imgs.search.brave.com/05Za5WdDNoQg2DRyVpM_mjM3n1ZXr8feP455ljY4q2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWFpbmNoYXJhY3Rl/cmluZGlhLmNvbS9j/ZG4vc2hvcC9maWxl/cy8zXzI0LnBuZz92/PTE3Njc3ODk0NTMm/d2lkdGg9NTMz",
    alt: "Fashion look 1",
  },
  {
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&q=80",
    alt: "Fashion look 2",
  },
  {
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
    alt: "Fashion look 3",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
    alt: "Fashion look 4",
  },
];

const ShopMainCharacter = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-center font-serif text-4xl md:text-5xl italic mb-12">
          Shop To Be The Main Character
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <Link
              key={i}
              to="/shop"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopMainCharacter;
