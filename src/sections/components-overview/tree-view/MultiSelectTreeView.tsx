'use client';

// MATERIAL - UI
import { TreeView, TreeItem } from '@mui/x-tree-view';

// PROJECT IMPORTS
import MainCard from 'components/MainCard';

// ASSETS
import { ArrowDown2, ArrowRight2 } from 'iconsax-react';

// ==============================|| TREE VIEW - MULTI SELECT ||============================== //

export default function MultiSelectTreeView() {
  const multiTreeviewCodeString = `<TreeView
  aria-label="multi-select"
  defaultCollapseIcon={<ArrowDown2 />}
  defaultExpandIcon={<ArrowRight2 />}
  multiSelect
  defaultExpanded={['1']}
  sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
>
  <TreeItem nodeId="1" label="Applications">
    <TreeItem nodeId="2" label="Calendar" />
    <TreeItem nodeId="3" label="Chrome" />
    <TreeItem nodeId="4" label="Webstorm" />
  </TreeItem>
  <TreeItem nodeId="5" label="Documents">
    <TreeItem nodeId="6" label="MUI">
      <TreeItem nodeId="7" label="src">
        <TreeItem nodeId="8" label="index.js" />
        <TreeItem nodeId="9" label="tree-view.js" />
      </TreeItem>
    </TreeItem>
  </TreeItem>
</TreeView>`;

  return (
    <MainCard title="Multi-Select" codeString={multiTreeviewCodeString}>
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ArrowDown2 />}
        defaultExpandIcon={<ArrowRight2 />}
        multiSelect
        defaultExpanded={['1']}
        sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="MUI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </MainCard>
  );
}
