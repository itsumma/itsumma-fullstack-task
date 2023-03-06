import type { NextApiRequest, NextApiResponse} from "next";

import { FamilyMember } from "@/interfaces/family-member";
import familyMemberService from "@/backend/services/FamilyMemberService";
import {response} from "@/backend/lib/response";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<FamilyMember[]>
) {
	const familyMembers = await familyMemberService.findAll();
	return response(res,200, {data: familyMembers});
}
