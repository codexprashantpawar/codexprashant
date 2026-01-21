import { useState, useRef, useCallback } from "react";
import { Camera, X, Sparkles, Upload, Loader2, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AITryOnProps {
  productImage: string;
  productName: string;
  open: boolean;
  onClose: () => void;
}

const AITryOn = ({ productImage, productName, open, onClose }: AITryOnProps) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (error) {
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setUserImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processVirtualTryOn = async () => {
    if (!userImage) {
      toast.error("Please capture or upload a photo first");
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-virtual-tryon', {
        body: { 
          userImage: userImage,
          productImage: productImage,
          productName: productName
        }
      });

      if (error) throw error;
      
      if (data?.resultImage) {
        setResultImage(data.resultImage);
        toast.success("Virtual try-on complete!");
      } else if (data?.description) {
        // If no image, show AI-generated description
        toast.info(data.description);
      }
    } catch (error: any) {
      console.error("AI Try-On error:", error);
      toast.error("Virtual try-on is currently unavailable. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setUserImage(null);
    setResultImage(null);
    stopCamera();
  };

  const handleClose = () => {
    stopCamera();
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">AI Virtual Try-On - {productName}</DialogTitle>
        
        <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-foreground">AI Virtual Try-On</h2>
                <p className="text-xs text-muted-foreground">See how {productName} looks on you</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* User Photo Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Your Photo</h3>
              
              {!userImage && !cameraActive && (
                <div className="aspect-[3/4] bg-secondary rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-muted-foreground/30">
                  <Camera className="w-12 h-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Take a photo or upload an image to try on this product
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={startCamera} size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Camera
                    </Button>
                    <label>
                      <Button asChild size="sm" variant="outline">
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {cameraActive && (
                <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <Button onClick={capturePhoto} size="lg" className="rounded-full">
                      <Camera className="w-6 h-6" />
                    </Button>
                    <Button onClick={stopCamera} size="lg" variant="outline" className="rounded-full">
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}

              {userImage && !resultImage && (
                <div className="relative aspect-[3/4] bg-secondary rounded-xl overflow-hidden">
                  <img src={userImage} alt="Your photo" className="w-full h-full object-cover" />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Product & Result Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">
                {resultImage ? "Try-On Result" : "Product"}
              </h3>
              
              <div className="aspect-[3/4] bg-secondary rounded-xl overflow-hidden">
                {resultImage ? (
                  <img src={resultImage} alt="Try-on result" className="w-full h-full object-cover" />
                ) : (
                  <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          {userImage && !resultImage && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={processVirtualTryOn} 
                disabled={isProcessing}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try It On
                  </>
                )}
              </Button>
            </div>
          )}

          {resultImage && (
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={reset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Another Photo
              </Button>
              <Button onClick={handleClose}>
                Continue Shopping
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center mt-4">
            Powered by AI • Results are for reference only
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AITryOn;