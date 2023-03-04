import fs from "fs";

export const removeIMG = async (imgName:string) => {
	await fs.unlinkSync(`${process.env.UPLOADS as string}/${imgName}`);
};
