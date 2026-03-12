const messages = [
  "🏷️ Get 10% off on all of your orders",
  "🚚 Free Shipping on orders above ₹999",
  "🏷️ Get 10% off on all of your orders",
  "✨ New Arrivals Every Week at INVAANI",
  "🏷️ Get 10% off on all of your orders",
  "💎 Handcrafted with Love — Shop INVAANI",
  "🏷️ Get 10% off on all of your orders",
  "🎁 Use Code INVAANI10 for Extra Discount",
];

const MarqueeBanner = () => {
  return (
    <div className="bg-highlight text-highlight-foreground overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-flex py-2">
        {[...messages, ...messages].map((msg, i) => (
          <span
            key={i}
            className="mx-8 text-xs md:text-sm font-sans font-medium tracking-wide inline-flex items-center gap-2"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
