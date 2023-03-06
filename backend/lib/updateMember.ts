import formidable, {File} from "formidable";
import {NextApiRequest} from "next";

import {FamilyMember} from "@/interfaces/family-member";
import familyMemberService from "@/backend/services/FamilyMemberService";
import {createNewImageName} from "@/backend/utils/create-new-image-name";
import {upload} from "@/backend/lib/upload";
import {removeIMG} from "@/backend/lib/removeIMG";

export const updateMember = async (req:NextApiRequest, id:string) => {
	try {
		const form = new formidable.IncomingForm();
		return await new Promise((resolve, reject) => {
			form.parse(req, async function (err, fields, files) {
				let data = {} as FamilyMember;
				if(files.avatar){
					const member = await familyMemberService.findById(id);
					if(member){
						const image = files.avatar as File;
						const imageName = createNewImageName(image.newFilename, image.originalFilename || ".png");
						await removeIMG(member?.avatar_url)
						await upload(image, imageName);
						data.avatar_url = imageName;
					}
				}
				data = {...data,...fields};
				const result = await  familyMemberService.update(id, data);
				resolve(result)
			})
		});
	} catch (e){
		throw new Error("Failed to update member");
	}

};
