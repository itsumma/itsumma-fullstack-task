import React, { Fragment, ReactNode } from 'react';
import { Avatar, Badge } from '@mui/material';
import styles from './TreeNode.module.css'

interface TreeNodeProps {
  title: string;
  children?: ReactNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <Badge
        overlap="rectangular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<p>{title}</p>}>
        <Avatar src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'></Avatar>
      </Badge>
      {title}
      {children}
    </div>
  );
};

export default TreeNode;
