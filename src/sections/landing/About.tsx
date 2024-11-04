'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cropper, { Area } from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import getCroppedImg from './cropImage';

// ASSETS
const initialImage = 'https://d3hh6raz9l4662.cloudfront.net/media/various/small_talk.png';

// ==============================|| ABOUT PANEL ||============================== //

const AboutPanel = () => {
  const panelId = 'about';
  const title = 'About Law On Earth';

  const initialText1 = `
    We believe that every human being has a right to a basic level of legal assistance and education. 
    The hard part has been finding ways to pull the cost out of legal and empower the public to manage their own legal needs to the extent they can.
  `;
  const initialText2 = `
    Our founder Katie Richards grew up in a small country town in North Queensland where there was at the time only one law firm so half the town had representation and everyone else had to fend for themselves. Katie has built up a team of lawyers, developers and entrepreneurs who are equally as passionate about making a difference for the masses and giving every Australian the opportunity to live happier, more fulfilled and safer futures with equal access to legal help when they need it most, regardless of where they live or what they earn.
  `;
  const initialText3 = `
    Research indicates that even in 2019, the majority of the world's population cannot afford or access legal assistance. 
    As a result, people are making decisions involving their legal rights, or making no decisions at all, and this is impacting not only their current life situation but their future also.
  `;

  const [text1, setText1] = useState(initialText1);
  const [text2, setText2] = useState(initialText2);
  const [text3, setText3] = useState(initialText3);
  const [previousText1, setPreviousText1] = useState(initialText1);
  const [previousText2, setPreviousText2] = useState(initialText2);
  const [previousText3, setPreviousText3] = useState(initialText3);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [image, setImage] = useState<string>(initialImage);
  const [openCrop, setOpenCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setHoverIndex(index);
    if (index === 1) setPreviousText1(text1);
    if (index === 2) setPreviousText2(text2);
    if (index === 3) setPreviousText3(text3);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
    if (hoverIndex === 1) setText1(previousText1);
    if (hoverIndex === 2) setText2(previousText2);
    if (hoverIndex === 3) setText3(previousText3);
  };

  const handleAddTextClick = (index: number) => {
    if (index === 1) setText1(previousText1);
    if (index === 2) setText2(previousText2);
    if (index === 3) setText3(previousText3);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
          setOpenCrop(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (croppedArea && image) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      setImage(croppedImage);
      setOpenCrop(false);
    }
  };

  return (
    <Box
      id={panelId}
      sx={{
        p: 5,
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(100,181,246,1) 100%)',
        minHeight: '100vh',
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h2" align="center" mb={5} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line' }}>
              {isEditing && hoverIndex === 1 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(1)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative', display: 'inline-block' }}
                >
                  {text1 || (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddTextClick(1)}
                      sx={{ marginTop: '8px' }}
                    >
                      Add Text
                    </Button>
                  )}
                  {hoverIndex === 1 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(1)}
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
                  )}
                </Box>
              )}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line', mt: 3 }}>
              {isEditing && hoverIndex === 2 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(2)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative' }}
                >
                  {text2 || (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddTextClick(2)}
                      sx={{ marginTop: '8px' }}
                    >
                      Add Text
                    </Button>
                  )}
                  {hoverIndex === 2 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(2)}
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
                  )}
                </Box>
              )}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line', mt: 3 }}>
              {isEditing && hoverIndex === 3 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text3}
                  onChange={(e) => setText3(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(3)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative' }}
                >
                  {text3 || (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddTextClick(3)}
                      sx={{ marginTop: '8px' }}
                    >
                      Add Text
                    </Button>
                  )}
                  {hoverIndex === 3 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(3)}
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
                  )}
                </Box>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <Box
                onMouseEnter={() => setHoverIndex(4)}
                onMouseLeave={() => setHoverIndex(null)}
                sx={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}
              >
                <img
                  alt={title}
                  src={image}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                {hoverIndex === 4 && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => fileInputRef.current?.click()}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        transform: 'translateY(-100%)',
                        marginBottom: '8px',
                      }}
                    >
                      Upload
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={openCrop}
          onClose={() => setOpenCrop(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Crop Image</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: '#333',
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoomValue) => setZoom(zoomValue as number)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenCrop(false)}
              color="secondary"
              variant="contained"
              sx={{ backgroundColor: '#f50057', color: '#fff' }}
            >
              Original
            </Button>
            <Button
              onClick={handleCropSave}
              color="primary"
              variant="contained"
              sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {isEditing && (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              onClick={handleSaveClick}
              color="primary"
              variant="contained"
              sx={{ backgroundColor: '#3f51b5', color: '#fff', mr: 2 }}
            >
              Save Changes
            </Button>
            <Button
              onClick={handleCancelClick}
              color="secondary"
              variant="contained"
              sx={{ backgroundColor: '#f50057', color: '#fff' }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AboutPanel;



/*
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cropper, { Area } from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import getCroppedImg from './cropImage';

// ASSETS
const initialImage = 'https://d3hh6raz9l4662.cloudfront.net/media/various/small_talk.png';

// ==============================|| ABOUT PANEL ||============================== //

const AboutPanel = () => {
  const panelId = 'about';
  const title = 'About Law On Earth';

  const initialText1 = `
    We believe that every human being has a right to a basic level of legal assistance and education. 
    The hard part has been finding ways to pull the cost out of legal and empower the public to manage their own legal needs to the extent they can.
  `;
  const initialText2 = `
    Our founder Katie Richards grew up in a small country town in North Queensland where there was at the time only one law firm so half the town had representation and everyone else had to fend for themselves. Katie has built up a team of lawyers, developers and entrepreneurs who are equally as passionate about making a difference for the masses and giving every Australian the opportunity to live happier, more fulfilled and safer futures with equal access to legal help when they need it most, regardless of where they live or what they earn.
  `;
  const initialText3 = `
    Research indicates that even in 2019, the majority of the world's population cannot afford or access legal assistance. 
    As a result, people are making decisions involving their legal rights, or making no decisions at all, and this is impacting not only their current life situation but their future also.
  `;

  const [text1, setText1] = useState(initialText1);
  const [text2, setText2] = useState(initialText2);
  const [text3, setText3] = useState(initialText3);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [image, setImage] = useState<string>(initialImage);
  const [openCrop, setOpenCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = (index: number) => {
    setIsEditing(true);
    setHoverIndex(index);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setHoverIndex(null);
    // Here you could also send the updated text to a server if needed
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
          setOpenCrop(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (croppedArea && image) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      setImage(croppedImage);
      setOpenCrop(false);
    }
  };

  return (
    <Box
      id={panelId}
      sx={{
        p: 5,
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(100,181,246,1) 100%)',
        minHeight: '100vh',
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h2" align="center" mb={5} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line' }}>
              {isEditing && hoverIndex === 1 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(1)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative', display: 'inline-block' }}
                >
                  {text1}
                  {hoverIndex === 1 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(1)}
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
                  )}
                </Box>
              )}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line', mt: 3 }}>
              {isEditing && hoverIndex === 2 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(2)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative' }}
                >
                  {text2}
                  {hoverIndex === 2 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(2)}
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
                  )}
                </Box>
              )}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'pre-line', mt: 3 }}>
              {isEditing && hoverIndex === 3 ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  value={text3}
                  onChange={(e) => setText3(e.target.value)}
                  variant="outlined"
                />
              ) : (
                <Box
                  onMouseEnter={() => setHoverIndex(3)}
                  onMouseLeave={() => setHoverIndex(null)}
                  sx={{ position: 'relative' }}
                >
                  {text3}
                  {hoverIndex === 3 && !isEditing && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(3)}
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
                  )}
                </Box>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
              <Box
                onMouseEnter={() => setHoverIndex(4)}
                onMouseLeave={() => setHoverIndex(null)}
                sx={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }} // Adjusted max width
              >
                <img
                  alt={title}
                  src={image}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                {hoverIndex === 4 && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => fileInputRef.current?.click()}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        transform: 'translateY(-100%)',
                        marginBottom: '8px',
                      }}
                    >
                      Upload
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={openCrop}
          onClose={() => setOpenCrop(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Crop Image</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 400,
                backgroundColor: '#333',
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoomValue) => setZoom(zoomValue as number)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenCrop(false)}
              color="secondary"
              variant="contained"
              sx={{ backgroundColor: '#f50057', color: '#fff' }}
            >
              Original
            </Button>
            <Button
              onClick={handleCropSave}
              color="primary"
              variant="contained"
              sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {isEditing && (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              onClick={handleSaveClick}
              color="primary"
              variant="contained"
              sx={{ backgroundColor: '#3f51b5', color: '#fff' }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AboutPanel;
*/
