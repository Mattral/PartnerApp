// NEXT
import Link from 'next/link';

// MATERIAL - UI
import Grid from '@mui/material/Grid';
import Links from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
const Dashboard1 = '/assets/images/widget/dashborad-1.jpg';
const Dashboard2 = '/assets/images/widget/dashborad-3.jpg';

const mediaSX = {
  width: 90,
  height: 80,
  borderRadius: 1
};

// ===========================|| DATA WIDGET - LATEST POSTS ||=========================== //

const LatestPosts = () => (
  <MainCard
    title="Latest Posts"
    content={false}
    secondary={
      <Links component={Link} href="#" color="primary">
        View all
      </Links>
    }
  >
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="img" image={Dashboard1} title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" variant="caption" color="secondary">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="iframe" src="https://www.youtube.com/embed/668nUCeBHyY" title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" variant="caption" color="secondary">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="img" image={Dashboard2} title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" variant="caption" color="secondary">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default LatestPosts;
