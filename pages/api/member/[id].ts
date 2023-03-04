import type { NextApiRequest, NextApiResponse} from "next";

import { FamilyMember } from "@/interfaces/family-member";
import familyMemberService from "@/backend/services/FamilyMemberService";
import {QueryParam} from "@/interfaces/query-param";
import {response} from "@/backend/lib/response";
import {removeMember} from "@/backend/lib/removeMember";
import {updateMember} from "@/backend/lib/updateMember";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{message:string} | FamilyMember>
) {
	const method = req.method;
	const {id} = req.query as QueryParam;

	switch (method) {
	case "GET":
		let member = await familyMemberService.findById(id);
		if(member){
			return response(res, 200,{data:member});
		}
		return response(res, 404,{data :{message: "Family member not found."}});

	case "PATCH":
		await updateMember(req, id);
		return response(res, 201, {data:{message: "Family member was updated."}});

	case "DELETE":
		await removeMember(id);
		return response(res, 201, {data:{message: "Family member was deleted."}});

	default:
		response(res, 404, {data:{message: "Method not found."}});
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
