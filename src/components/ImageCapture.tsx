import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageCaptureProps {
  onImageCapture: (base64: string) => void;
}

export default function ImageCapture({ onImageCapture }: ImageCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    setFile(selected);
    
    // Create preview and convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreview(base64);
    };
    reader.readAsDataURL(selected);
  };

  const handleAnalyze = () => {
    if (!preview) {
      alert("Select an image first");
      return;
    }
    onImageCapture(preview);
  };

  return (
    <div className="space-y-4 p-6 border-2 border-dashed rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Click to select or drag image</p>
            {file && <p className="font-semibold text-blue-600">{file.name}</p>}
          </div>
        </label>

        {preview && (
          <div className="mt-4 w-full">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-xs mx-auto rounded-lg max-h-80"
            />
          </div>
        )}
      </div>

      <Button 
        onClick={handleAnalyze}
        disabled={!preview}
        className="w-full"
      >
        Analyze Skin
      </Button>
    </div>
  );
}
