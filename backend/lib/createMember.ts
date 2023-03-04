import formidable, {File} from "formidable";
import {NextApiRequest, NextApiResponse} from "next";

import {createNewImageName} from "@/backend/utils/create-new-image-name";
import {upload} from "@/backend/lib/upload";
import {FamilyMember} from "@/interfaces/family-member";
import familyMemberService from "@/backend/services/FamilyMemberService";

export const createMember = async (req:NextApiRequest, res: NextApiResponse) => {
	try {
		const form = new formidable.IncomingForm();
		form.parse(req, async function (err, fields, files) {
			if (!Object.keys(files).length || !fields.first_name || !fields.last_name) {
				return res.status(400).json({message: "Fill all fields"});
			}
			const image = files.avatar as File;
			const imageName = createNewImageName(image.newFilename, image.originalFilename || ".png");
			await upload(image, imageName);
			const data = {
				...fields,
				avatar_url: imageName
			} as FamilyMember;
			await familyMemberService.create(data);
		});
	}catch (e) {
		throw new Error("Failed to create member");
	}
};
