import {NextApiResponse} from "next";

import {FamilyMember} from "@/interfaces/family-member";

type Data = {
    data: {message:string}| FamilyMember| FamilyMember[]
}

export const response = (res: NextApiResponse, status:number, data: Data) => {
	return res.status(status).json(data);
};
