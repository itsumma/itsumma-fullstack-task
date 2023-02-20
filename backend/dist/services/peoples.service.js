"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class PeoplesService {
    getPeoples() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(index_1.pool.query);
            try {
                const { rows } = yield index_1.pool.query('SELECT * FROM peoples');
                return rows;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    getPersonById(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(personId);
            try {
                const { rows } = yield index_1.pool.query('SELECT * FROM peoples WHERE id = $1', [personId]);
                return rows[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    createPerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.pool.query('INSERT INTO peoples (name) VALUES ($1) RETURNING *', [person.name]);
                return result.rows[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    // async updatePerson(personId: number, person: Person, file: any) {
    //   try {
    //     // Check if file was uploaded
    //     if (file) {
    //       // Create a unique filename to avoid overwriting existing files
    //       const filename = uuidv4() + path.extname(file.name);
    //       // Set the file path where the file will be saved on the server
    //       const filepath = path.join(__dirname, 'uploads', filename);
    //       // Create a write stream to save the file to the server
    //       const fileStream = fs.createWriteStream(filepath);
    //       // Pipe the uploaded file to the write stream
    //       file.pipe(fileStream);
    //       // Wait for the file to finish uploading
    //       await new Promise((resolve, reject) => {
    //         fileStream.on('finish', resolve);
    //         fileStream.on('error', reject);
    //       });
    //       // Update the database with the new filename
    //       const result = await pool.query('UPDATE items SET item_title = $1, image_filename = $2 WHERE item_id = $3 RETURNING *', [person.name, filename, personId]);
    //       return result.rows[0];
    //     } else {
    //       // If no file was uploaded, update the database without a filename
    //       const result = await pool.query('UPDATE items SET item_title = $1 WHERE item_id = $2 RETURNING *', [person.name, personId]);
    //       return result.rows[0];
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     throw err;
    //   }
    // }
    updatePerson(personId, person, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.pool.query('UPDATE peoples SET name = $1, imageurl = $2 WHERE id = $3 RETURNING *', [person.name, imageUrl, personId]);
                return result.rows[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    deletePerson(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.pool.query('DELETE FROM peoples WHERE id = $1 RETURNING *', [personId]);
                return result.rows[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.default = new PeoplesService();
