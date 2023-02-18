import React from 'react';

export interface Person {
  id: number;
  name: string;
  mother_id?: number;
  father_id?: number;
  imageUrl?: string;
}

type Props = {
  persons: Person[];
};

const PeoplePage = ({ persons }: Props) => {
  return (
    <div>
      {persons.map((el) => (
        <div>{el.name}</div>
      ))}
    </div>
  );
};

export default PeoplePage;


export async function getServerSideProps(): Promise<{ props: Props }> {
  const fetchedData = await fetch('http://localhost:3001/api/peoples', {}).then((res) =>
    res.json(),
  ) as Person[] | null;

  console.log(fetchedData);

  return {
    props: { persons: fetchedData ?? [] }, // will be passed to the page component as props
  };
}
