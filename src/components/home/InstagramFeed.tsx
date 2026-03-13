// import { Instagram } from "lucide-react";

// const instagramPosts = [
//   "https://imgs.search.brave.com/05Za5WdDNoQg2DRyVpM_mjM3n1ZXr8feP455ljY4q2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWFpbmNoYXJhY3Rl/cmluZGlhLmNvbS9j/ZG4vc2hvcC9maWxl/cy8zXzI0LnBuZz92/PTE3Njc3ODk0NTMm/d2lkdGg9NTMz",
//   "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
//   "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80",
//   "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
// ];

// const InstagramFeed = () => {
//   return (
//     <section className="py-16 bg-secondary/30">
//       <div className="container">
//         <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 items-center">
//           <div className="text-center md:text-left">
//             <h2 className="font-serif text-3xl md:text-4xl italic leading-tight mb-2">
//               Follow us on
//             </h2>
//             <a
//               href="https://instagram.com/invaani_"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-highlight font-serif text-2xl md:text-3xl hover:underline"
//             >
//               @invaani_
//             </a>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {instagramPosts.map((src, i) => (
//               <a
//                 key={i}
//                 href="https://instagram.com/invaani_"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group relative aspect-square overflow-hidden bg-secondary rounded-lg"
//               >
//                 <img
//                   src={src}
//                   alt={`INVAANI Instagram post ${i + 1}`}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
//                   <Instagram className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InstagramFeed;

import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

const instagramPosts = [
  "https://imgs.search.brave.com/05Za5WdDNoQg2DRyVpM_mjM3n1ZXr8feP455ljY4q2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWFpbmNoYXJhY3Rl/cmluZGlhLmNvbS9j/ZG4vc2hvcC9maWxl/cy8zXzI0LnBuZz92/PTE3Njc3ODk0NTMm/d2lkdGg9NTMz",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
];

const InstagramFeed = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 items-center">

          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl italic leading-tight mb-2">
              Follow us on
            </h2>
            <a
              href="https://www.instagram.com/invaanii?igsh=MThudnR0YmRsbng5eA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-highlight font-serif text-2xl md:text-3xl hover:underline"
            >
              @invaani_
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((src, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-white overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=40&q=80"
                          alt="INVAANI"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[11px] font-semibold text-gray-900">INVAANI</span>
                      <span className="text-[9px] text-gray-500">Pune</span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </div>

                <a
                  href="https://instagram.com/invaani_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`INVAANI Instagram post ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </a>

                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-gray-800 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="w-5 h-5 text-gray-800 hover:text-blue-500 cursor-pointer transition-colors" />
                    <Send className="w-5 h-5 text-gray-800 hover:text-green-500 cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="w-5 h-5 text-gray-800 hover:text-yellow-500 cursor-pointer transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
