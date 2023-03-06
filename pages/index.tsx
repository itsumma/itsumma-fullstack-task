import * as React from "react";
import {useCallback, useState} from "react";
import {GetServerSideProps} from "next";

import createTree from "@/frontend/helpers/create-tree";
import {ModalMUI} from "@/frontend/components/modal/ModalMUI";
import AddMemberForm from "@/frontend/components/forms/AddMember";
import familyMemberService from "@/frontend/services";
import StartScreen from "@/frontend/components/screens/StartScreen";
import FamilyScreen from "@/frontend/components/screens/FamilyScreen";
import {FamilyTreeType} from "@/interfaces/famili-tree";

type Props = {
	familyTree: [FamilyTreeType]
}



export default function Home({familyTree}:Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [tree, setTree] = useState<[]|[FamilyTreeType]>(familyTree);
	const toggleModal = useCallback(() => {
		setOpen(value =>!value);
	}, []);

	const updateTree = async () => {
		const members = await familyMemberService.getAll();
		const tree = createTree(members);
		setTree(tree);
	};

	return (
		<React.Fragment>
			{
				tree?.length
					?
					<FamilyScreen tree={tree[0]} updateTree={updateTree}/>
					:
					<StartScreen toggleModal={toggleModal}/>
			}
			<ModalMUI open={open}>
				<AddMemberForm updateTree={updateTree} onCancel={toggleModal}/>
			</ModalMUI>
		</React.Fragment>
	);
}


export const getServerSideProps: GetServerSideProps = async () => {
	const members = await familyMemberService.getAll();
	const familyTree = createTree(members);
	return {
		props:{
			familyTree
		}
	};
};
