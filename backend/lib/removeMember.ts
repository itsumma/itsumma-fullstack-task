import familyMemberService from "@/backend/services/FamilyMemberService";
import {removeIMGbatch} from "@/backend/lib/removeIMGbatch";

export const removeMember = async (id:string) => {
	try {
    	await familyMemberService.delete(id);
    	const members = await familyMemberService.findAll();
    	const imgNames = members.map(member => member.avatar_url);
    	await removeIMGbatch(imgNames);
	}catch (e) {
		throw new Error("Failed to remove member");
	}
};
