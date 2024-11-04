'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Cropper from 'react-easy-crop';
import getCroppedImg, { Area } from './cropImage';

const EditableImageSection = ({ initialImage }) => {
  const [image, setImage] = useState(initialImage);
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [hover, setHover] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    if (croppedArea) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      setImage(croppedImage);
    }
    setIsEditing(false);
  };

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      <CardMedia component="img" image={image} sx={{ width: '100%' }} />
      {hover && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              transform: 'translateY(-100%)',
              marginBottom: '8px',
            }}
          >
            Edit
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'translateY(-100%)',
                marginBottom: '8px',
              }}
            >
              Upload
            </Button>
          </label>
        </>
      )}
      <Modal open={isEditing} onClose={() => setIsEditing(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '80vw', height: '80vh', backgroundColor: 'white', p: 4, boxShadow: 24 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            style={{ containerStyle: { width: '100%', height: 'calc(100% - 60px)' } }}
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              onClick={handleSaveClick}
              color="primary"
              variant="contained"
              sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditableImageSection;
