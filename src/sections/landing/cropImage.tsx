// cropImage.tsx

export interface Area {
    
    x: number;
    y: number;
    width: number;
    height: number;
    }

    export default function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
        });

    return new Promise(async (resolve, reject) => {
        try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        resolve(canvas.toDataURL('image/jpeg'));
        } catch (error) {
        reject(error);
        }
    });
    }
