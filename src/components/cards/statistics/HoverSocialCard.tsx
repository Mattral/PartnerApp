// MATERIAL - UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// TYPES
import { GenericCardProps } from 'types/root';

// ===========================|| STATISTICS - HOVER SOCIAL CARD ||=========================== //

interface HoverSocialCardProps extends GenericCardProps {}

const HoverSocialCard = ({ primary, secondary, iconPrimary, color }: HoverSocialCardProps) => {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary variant="Bold" size={52} /> : null;

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: color,
        position: 'relative',
        color: '#fff',
        '&:hover svg': {
          opacity: 1,
          transform: 'scale(1.1)'
        }
      }}
    >
      <CardContent>
        <Box
          sx={{
            position: 'absolute',
            right: 15,
            top: 25,
            color: '#fff',
            '& svg': {
              opacity: 0.4,
              transition: 'all .3s ease-in-out'
            }
          }}
        >
          {primaryIcon}
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h3" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">{primary}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HoverSocialCard;
