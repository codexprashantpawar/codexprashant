const WhatsAppButton = () => {
  const phoneNumber = "918830764356"; // Your WhatsApp number
  const message = "Hello! I have a query about INVAANI products.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25"></div>
        
        {/* Main button */}
        <div className="relative bg-[#25D366] hover:bg-[#20BD5A] p-3.5 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center">
          {/* Official WhatsApp SVG Icon */}
          <svg 
            viewBox="0 0 32 32" 
            className="w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.156-1.97C9.774 30.998 12.754 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.596c-.386 1.09-1.91 1.994-3.13 2.258-.836.178-1.926.32-5.598-1.204-4.698-1.95-7.722-6.732-7.954-7.044-.224-.312-1.87-2.492-1.87-4.754 0-2.262 1.184-3.374 1.604-3.836.386-.422.912-.61 1.382-.61.166 0 .316.008.45.016.42.018.63.042.908.702.346.826 1.19 2.898 1.294 3.112.104.214.174.464.034.744-.132.286-.198.464-.396.714-.198.25-.416.558-.596.748-.198.214-.404.446-.174.874.23.42.022 1.028.694 1.7.862.866 1.582 1.134 1.808 1.26.23.126.364.106.498-.064.14-.176.594-.694.752-.932.158-.238.316-.198.534-.118.224.076 1.406.664 1.648.786.242.122.402.182.462.282.06.1.06.58-.326 1.672z"/>
          </svg>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-medium pointer-events-none">
          Chat with us
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-white"></div>
        </div>
      </div>
    </button>
  );
};

export default WhatsAppButton;