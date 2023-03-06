import React, { useState } from "react";
import MemberCard from "@/frontend/components/card/MemberCard";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Child, FamilyTreeType} from "@/interfaces/famili-tree";

type Props = {
    familyTree: FamilyTreeType | Child
    updateTree: () => void
    children: boolean
}


export default function FamilyTree({ familyTree, updateTree, children }:Props) {
    const [isVisible, setIsVisible] = useState(true);
    const expand = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className='family-tree_container'>
            {
                familyTree.parent_id && <>
                    <hr className='family-tree_hr-vertical'/>
                    <ArrowDropDownOutlinedIcon className='family-tree_arrow'/>
                </>
            }

            <MemberCard family={familyTree} children={children} expand={expand} updateTree={updateTree} />
            <div className='family-tree_section-mobile'>
                <hr className='family-tree_mobile'/>
                <div className='family-tree_section'>
                    {isVisible ? (
                        familyTree?.children?.map((child:Child) => {
                            return (
                                <div className='family-tree_box' key={child.id}>
                                    <FamilyTree familyTree={child} children={!!child.children} updateTree={updateTree}/>
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>

        </div>
    );
}



