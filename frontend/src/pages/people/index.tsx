
import TreeNode from '@/components/NodeComponent/TreeNode';
import React, { FC, ReactNode } from 'react';

export interface Person {
  id: number;
  name: string;
  mother_id?: number;
  father_id?: number;
  imageUrl?: string;
}

type Props = {
  people: Person[];
};

const PeoplePage: FC<Props> = ({ people }) => {
  console.log(people);
  
  const findChildren = (personId: number): Person[] => {
    return people.filter((p) => p.father_id === personId || p.mother_id === personId);
  };

  const buildTree = (person: Person): ReactNode => {
    const children = findChildren(person.id);
    if (children.length === 0) {
      return <TreeNode key={person.id} title={person.name} />;
    } else {
      return (
        <TreeNode key={person.id} title={person.name}>
          {children.map((child) => buildTree(child))}
        </TreeNode>
      );
    }
  };


  const rootNodes = people.filter((p) => p.father_id === null && p.mother_id === null);
console.log(rootNodes);

  return <div>{rootNodes.map((person) => buildTree(person))}</div>;
};

export default PeoplePage;

export async function getServerSideProps(): Promise<{ props: Props }> {
  const fetchedData = (await fetch('http://localhost:3001/api/peoples', {}).then((res) =>
    res.json(),
  )) as Person[] | null;

  console.log(fetchedData);

  return {
    props: { people: fetchedData ?? [] },
  };
}
