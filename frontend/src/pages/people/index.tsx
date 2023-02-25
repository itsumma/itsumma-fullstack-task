import TreeNode from '@/components/NodeComponent/TreeNode';
import { selectPeople, setPeople } from '@/store/peopleSlice';
import { wrapper } from '@/store/store';
import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

export interface Person {
  id: number;
  name: string;
  mother_id?: number;
  father_id?: number;
  imageurl?: string;
}

type Props = {
  people: Person[];
};

const PeoplePage: FC<Props> = () => {
  const people = useSelector(selectPeople);

  console.log(people);

  const findChildren = (
    personId: number,
    groupedChildren: { [key: number]: boolean },
  ): Person[] => {
    return people.filter((p) => {
      if (p.father_id === personId || p.mother_id === personId) {
        if (groupedChildren[p.id]) {
          return false; // child has already been included in the tree
        }
        groupedChildren[p.id] = true;
        return true; // include the child in the tree
      }
      return false; // exclude the child from the tree
    });
  };

  const buildTree = (
    person: Person,
    groupedChildren: { [key: number]: boolean },
    isRoot?: boolean,
    isFirst?: boolean,
    isLast?: boolean,
  ): ReactNode => {
    const children = findChildren(person.id, groupedChildren);

    const renderedChildren = children.map((child) => buildTree(child, groupedChildren));

    if (renderedChildren.length === 0) {
      return <TreeNode person={person} key={person.id} />;
    } else {
      return (
        <TreeNode person={person} key={person.id} isRoot={isRoot} isFirst={isFirst} isLast={isLast}>
          {renderedChildren}
        </TreeNode>
      );
    }
  };

  const rootNodes = people.filter((p) => p.father_id === null && p.mother_id === null);
  console.log(rootNodes);

  return <div>{rootNodes.map((person) => buildTree(person, {}))}</div>;
};

export default PeoplePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const fetchedData = (await fetch('http://localhost:3001/api/peoples', {}).then((res) =>
    res.json(),
  )) as Person[] | null;

  console.log(fetchedData);
  store.dispatch(setPeople(fetchedData ?? []));
  return {
    props: { people: fetchedData ?? [] },
  };
});
