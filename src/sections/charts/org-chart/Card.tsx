import { Fragment } from 'react';

// NEXT
import dynamic from 'next/dynamic';

// PROJECT IMPORTS
import DataCard from './DataCard';
import { CardMiddleware } from 'types/org-chart';

// THIRD - PARTY
import { TreeNodeProps } from 'react-organizational-chart';
const TreeNode = dynamic<TreeNodeProps>(() => import('react-organizational-chart').then((mod) => mod.TreeNode), {
  ssr: false
});

// ==============================|| ORGANIZATION CHART - CARD ||============================== //

function Card({ items }: CardMiddleware) {
  return (
    <>
      {items.map((item: any, id: any) => (
        <Fragment key={id}>
          {item.children ? (
            <TreeNode
              label={
                <DataCard
                  name={item.name}
                  role={item.role}
                  avatar={item.avatar}
                  linkedin={item.linkedin}
                  facebook={item.facebook}
                  skype={item.skype}
                  root={false}
                />
              }
            >
              <Card items={item.children} />
            </TreeNode>
          ) : (
            <TreeNode
              label={
                <DataCard
                  name={item.name}
                  role={item.role}
                  avatar={item.avatar}
                  linkedin={item.linkedin}
                  facebook={item.facebook}
                  skype={item.skype}
                  root={false}
                />
              }
            />
          )}
        </Fragment>
      ))}
    </>
  );
}
export default Card;
