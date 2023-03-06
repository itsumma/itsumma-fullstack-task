import fs from "fs";

export const removeIMGbatch = async (imgNames: string[]) => {
	fs.readdir(process.env.UPLOADS as string, async (err, files) => {
		for (let i = 0; i < files.length; i++) {
			if(!imgNames.includes(files[i]) && files[i] !== '.gitkeep'){
				await fs.unlinkSync(`${process.env.UPLOADS as string}/${files[i]}`);
			}
		}
	});
};
