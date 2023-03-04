export type FamilyTreeType = {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: File;
    parent_id: null;
    children: Child[];
}

export type Child = {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: File;
    parent_id: string;
    children?: Child[]; // optional array of child objects
}


