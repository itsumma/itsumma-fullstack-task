import type { NextApiRequest, NextApiResponse} from "next";

import {response} from "@/backend/lib/response";
import {createMember} from "@/backend/lib/createMember";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{message:string}>
) {
	res.setHeader('Content-Type', 'application/json');
	const method = req.method;
	if(method === "POST"){
		await createMember(req,res);
		return response(res, 201, {data:{message: "Family member was created"}});
	} else{
		return response(res, 404, {data:{message: "Method not found."}});
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};


