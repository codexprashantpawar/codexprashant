// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

// const heroSlides = [
//   {
//     image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
//     title: "New Collection 2026",
//     subtitle: "Discover Elegance",
//     cta: "Shop Now",
//     link: "/shop",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
//     title: "Women's Ethnic Wear",
//     subtitle: "Tradition Meets Style",
//     cta: "Explore Women",
//     link: "/category/ethnic-wear",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
//     title: "Handcrafted Sarees",
//     subtitle: "Artisan Collection",
//     cta: "Shop Sarees",
//     link: "/category/sarees",
//   },
// ];

// const HeroSection = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % heroSlides.length);
//     }, 6000);
//     return () => clearInterval(timer);
//   }, []);

//   const slide = heroSlides[current];

//   return (
//     <section className="relative w-full h-screen pt-[calc(2rem+4rem)]">
//       {/* Slides */}
//       {heroSlides.map((s, i) => (
//         <div
//           key={i}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             i === current ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           {/* {s.video ? (
//             <video
//               src={s.video}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-full object-cover"
//             />
//           ) : ( */}
//             <img
//               src={s.image}
//               alt={s.title}
//               className="w-full h-full object-cover"
//             />
//           ){"}"}  
//           <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
//         </div>
//       ))}

//       {/* Content overlay */}
//       <div className="absolute inset-0 flex items-end justify-center pb-24 z-10">
//         <div className="text-center stagger-children">
//           <p className="text-primary-foreground/80 text-sm font-sans uppercase tracking-ultra mb-3">
//             {slide.subtitle}
//           </p>
//           <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 leading-tight">
//             {slide.title}
//           </h1>
//           <Button variant="hero" size="lg" asChild>
//             <Link to={slide.link}>{slide.cta}</Link>
//           </Button>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
//         {heroSlides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`h-1 rounded-full transition-all duration-500 ${
//               i === current
//                 ? "w-10 bg-primary-foreground"
//                 : "w-4 bg-primary-foreground/40"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=90&fit=crop",
    title: "New Collection 2026",
    subtitle: "Discover Elegance",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=90&fit=crop",
    title: "Women's Ethnic Wear",
    subtitle: "Tradition Meets Style",
    cta: "Explore Women",
    link: "/category/ethnic-wear",
  },
  {
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=90&fit=crop",
    title: "Handcrafted Sarees",
    subtitle: "Artisan Collection",
    cta: "Shop Sarees",
    link: "/category/sarees",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-24 z-10">
        <div className="text-center stagger-children">
          <p className="text-primary-foreground/80 text-sm font-sans uppercase tracking-ultra mb-3">
            {slide.subtitle}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 leading-tight">
            {slide.title}
          </h1>
          <Button variant="hero" size="lg" asChild>
            <Link to={slide.link}>{slide.cta}</Link>
          </Button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current
                ? "w-10 bg-primary-foreground"
                : "w-4 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;