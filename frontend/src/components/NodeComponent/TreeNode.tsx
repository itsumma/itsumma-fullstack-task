import React, { Fragment, ReactNode } from 'react';
import { Avatar, Badge, Button } from '@mui/material';
import styles from './TreeNode.module.css';
import BasicMenu from '../MenuComponent/MenuComponent';
import { Person } from '@/pages';

interface TreeNodeProps {
  person: Person
  children?: ReactNode;
  isRoot?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isParent?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  person,
  children,
  isRoot,
  isFirst,
  isLast,
  isParent,
}) => {
  const nodeClassNames = [
    styles['tree-node'],
    isRoot && styles.root,
    isFirst && styles['tree-line-first-child'],
    isLast && styles['tree-line-last-child'],
    isParent && styles.parent,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={nodeClassNames}>
      <Badge
        overlap="rectangular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<p>{person.name}</p>}>
        <BasicMenu person={person}/>
      </Badge>
      {/* <div className={styles['tree-node-title']}>{title}</div> */}
      <div className={styles.children}>{children}</div>
      {!isRoot && <div className={`${styles['tree-line']} ${styles['tree-line-first-child']}`} />}
    </div>
  );
};

export default TreeNode;
