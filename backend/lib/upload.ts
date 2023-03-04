import fs from "fs";

import {File} from "formidable";


export const upload = async (file: File, name:string, ) => {
	const data = fs.readFileSync(file.filepath);
	fs.writeFileSync(`${process.env.UPLOADS as string}/${name}`, data);
	return;
};
