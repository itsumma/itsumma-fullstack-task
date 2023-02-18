import React, { ReactNode } from 'react';
import { Avatar, Badge } from '@mui/material';

interface TreeNodeProps {
  title: string;
  children?: ReactNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ title, children }) => {
  return (
    <>
      <Badge
        overlap="rectangular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={<p>{title}</p>}>
        <Avatar alt={`Фото ${title}`} src="" />
      </Badge>
      {/* {title} */}
      {children}
    </>
  );
};

export default TreeNode;
