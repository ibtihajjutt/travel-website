import { useState, useEffect } from 'react';

export const useImagePreloader = (imagePaths: string[]) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imagePaths.length) return;
    
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(imagePaths.length);
    let isMounted = true;

    imagePaths.forEach((path, index) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        imgArray[index] = img;
        if (loadedCount === imagePaths.length) {
          setImages(imgArray);
          setLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [imagePaths]);

  return { images, loaded };
};
