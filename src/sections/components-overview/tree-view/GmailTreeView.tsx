'use client';

import { ReactNode } from 'react';

// MATERIAL - UI
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TreeItem, TreeItemProps, TreeView, treeItemClasses } from '@mui/x-tree-view';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { ArrowDown2, ArrowRight2, Book1, InfoCircle, Profile, Sms, Tag2, Trash } from 'iconsax-react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: ReactNode;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
    paddingBottom: theme.spacing(0.75),
    paddingRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const { bgColor, color, labelIcon, labelInfo, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Stack direction="row" spacing={0.5}>
          <Box sx={{ mr: 1, fontSize: '1rem' }}>{labelIcon}</Box>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Stack>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor
      }}
      {...other}
    />
  );
}

// ==============================|| TREE VIEW - GMAIL ||============================== //

export default function GmailTreeView() {
  const gmailTreeviewCodeString = `// GmailTreeView.tsx
<TreeView
  aria-label="gmail"
  defaultExpanded={['3']}
  defaultCollapseIcon={<ArrowDown3 variant="Bold" />}
  defaultExpandIcon={<ArrowRight3 variant="Bold" />}
  defaultEndIcon={<div style={{ width: 24 }} />}
  sx={{ height: 400, flexGrow: 1, overflowY: 'auto' }}
>
  <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={<Sms variant="Bold" />} />
  <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={<Trash variant="Bold" />} />
  <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={<Tag2 variant="Bold" />}>
    <StyledTreeItem nodeId="5" labelText="Social" labelIcon={<Profile variant="Bold" />} labelInfo="90" color="#1a73e8" bgColor="#e8f0fe" />
    <StyledTreeItem
      nodeId="6"
      labelText="Updates"
      labelIcon={<InfoCircle variant="Bold" />}
      labelInfo="2,294"
      color="#e3742f"
      bgColor="#fcefe3"
    />
    <StyledTreeItem
      nodeId="7"
      labelText="Forums"
      labelIcon={<Book1 variant="Bold" />}
      labelInfo="3,566"
      color="#a250f5"
      bgColor="#f3e8fd"
    />
    <StyledTreeItem nodeId="8" labelText="Promotions" labelIcon={<Tag2 variant="Bold" />} labelInfo="733" color="#3c8039" bgColor="#e6f4ea" />
  </StyledTreeItem>
  <StyledTreeItem nodeId="4" labelText="History" labelIcon={<Tag2 variant="Bold" />} />
</TreeView>`;

  return (
    <MainCard title="Gmail Clone" codeString={gmailTreeviewCodeString}>
      <TreeView
        aria-label="gmail"
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDown2 variant="Bold" />}
        defaultExpandIcon={<ArrowRight2 variant="Bold" />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ height: 400, flexGrow: 1, overflowY: 'auto' }}
      >
        <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={<Sms />} />
        <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={<Trash />} />
        <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={<Tag2 />}>
          <StyledTreeItem
            nodeId="5"
            labelText="Social"
            labelIcon={<Profile variant="Bulk" />}
            labelInfo="90"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            nodeId="6"
            labelText="Updates"
            labelIcon={<InfoCircle variant="Bulk" />}
            labelInfo="2,294"
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            nodeId="7"
            labelText="Forums"
            labelIcon={<Book1 variant="Bulk" />}
            labelInfo="3,566"
            color="#a250f5"
            bgColor="#f3e8fd"
          />
          <StyledTreeItem
            nodeId="8"
            labelText="Promotions"
            labelIcon={<Tag2 variant="Bulk" />}
            labelInfo="733"
            color="#3c8039"
            bgColor="#e6f4ea"
          />
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="History" labelIcon={<Tag2 />} />
      </TreeView>
    </MainCard>
  );
}
