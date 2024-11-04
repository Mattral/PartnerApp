'use client';

// MATERIAL - UI
import { TreeItem, TreeView } from '@mui/x-tree-view';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

// ==============================|| TREE VIEW - BASIC ||============================== //

export default function BasicTreeView() {
  const basicTreeviewCodeString = `<TreeView
  aria-label="file system navigator"
  defaultCollapseIcon={<ArrowDown2 />}
  defaultExpandIcon={<ArrowRight2 />}
  defaultExpanded={['5']}
  sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
>
  <TreeItem nodeId="1" label="Applications">
    <TreeItem nodeId="2" label="Calendar" />
  </TreeItem>
  <TreeItem nodeId="5" label="Documents">
    <TreeItem nodeId="10" label="OSS" />
    <TreeItem nodeId="6" label="MUI">
      <TreeItem nodeId="8" label="index.js" />
    </TreeItem>
  </TreeItem>
</TreeView>`;

  return (
    <MainCard title="Basic" codeHighlight codeString={basicTreeviewCodeString}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ArrowDown2 />}
        defaultExpandIcon={<ArrowRight2 />}
        defaultExpanded={['5']}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="10" label="OSS" />
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="8" label="index.js" />
          </TreeItem>
        </TreeItem>
      </TreeView>
    </MainCard>
  );
}
