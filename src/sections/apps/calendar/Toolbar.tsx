import { useState, useEffect } from 'react';

// MATERIAL - UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid, { GridProps } from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';

// THIRD - PARTY
import { format } from 'date-fns';

// PROJECT IMPORTS
import IconButton from 'components/@extended/IconButton';

// ASSETS
import { ArrowLeft2, ArrowRight2, Calendar1, Category, Grid6, TableDocument } from 'iconsax-react';

// constant
const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: Category
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: Grid6
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: Calendar1
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: TableDocument
  }
];

// ==============================|| CALENDAR - TOOLBAR ||============================== //

export interface ToolbarProps {
  date: number | Date;
  view: string;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickToday: () => void;
  onChangeView: (s: string) => void;
  sx?: GridProps['sx'];
}

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, sx, ...others }: ToolbarProps) => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [viewFilter, setViewFilter] = useState(viewOptions);

  useEffect(() => {
    if (matchDownSM) {
      const filter = viewOptions.filter((item) => item.value !== 'dayGridMonth' && item.value !== 'timeGridWeek');
      setViewFilter(filter);
    } else {
      setViewFilter(viewOptions);
    }
  }, [matchDownSM]);

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={matchDownSM ? 1 : 3} {...others} sx={{ pb: 3 }}>
      <Grid item>
        <Button variant="outlined" onClick={onClickToday} size={matchDownSM ? 'small' : 'medium'}>
          Today
        </Button>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={matchDownSM ? 1 : 3}>
          <IconButton onClick={onClickPrev} size={matchDownSM ? 'small' : 'large'}>
            <ArrowLeft2 />
          </IconButton>
          <Typography variant={matchDownSM ? 'h5' : 'h3'} color="textPrimary">
            {format(date, 'MMMM yyyy')}
          </Typography>
          <IconButton onClick={onClickNext} size={matchDownSM ? 'small' : 'large'}>
            <ArrowRight2 />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {viewFilter.map((viewOption) => {
            const Icon = viewOption.icon;
            return (
              <Tooltip title={viewOption.label} key={viewOption.value}>
                <Button
                  size={matchDownSM ? 'small' : 'large'}
                  disableElevation
                  variant={viewOption.value === view ? 'contained' : 'outlined'}
                  onClick={() => onChangeView(viewOption.value)}
                >
                  <Icon variant={viewOption.value === view ? 'Bold' : 'Linear'} />
                </Button>
              </Tooltip>
            );
          })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
