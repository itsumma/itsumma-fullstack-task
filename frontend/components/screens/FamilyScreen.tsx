import  FamilyTree from "@/frontend/components/FamilyTree";
import * as React from "react";
import {FamilyTreeType} from "@/interfaces/famili-tree";

type Props = {
    tree: FamilyTreeType,
    updateTree:() => void
}

export default function FamilyScreen({tree, updateTree}: Props){
    return (
        <div className='min-width_max-content'>
            <FamilyTree familyTree={tree} updateTree={updateTree} children={!!tree.children}/>
        </div>
    )
}
