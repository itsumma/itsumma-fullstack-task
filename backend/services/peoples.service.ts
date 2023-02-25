import {pool} from '../index';
import fs from 'fs';
import path from 'path'

export interface Person {
  id: number;
  name: string;
  mother_id?: number;
  father_id?: number;
  imageUrl?: string;
}

class PeoplesService {
  async getPeoples() {
    console.log(pool.query);
    try {
      const { rows } = await pool.query('SELECT * FROM peoples');
      return rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getPersonById(personId: number) {
    console.log(personId);
    try {
      const { rows } = await pool.query('SELECT * FROM peoples WHERE id = $1', [personId]);
      return rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createPerson(person: Person) {
    try {
      const result = await pool.query('INSERT INTO peoples (name) VALUES ($1) RETURNING *', [person.name]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
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
  

  async updatePerson(personId: number, person: Partial<Person>, imageUrl?: string) {
    try {
      const result = await pool.query('UPDATE peoples SET name = $1, imageurl = $2 WHERE id = $3 RETURNING *', [person.name, imageUrl, personId]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  
  
  

  async deletePerson(personId: number) {
    try {
      const result = await pool.query('DELETE FROM peoples WHERE id = $1 RETURNING *', [personId]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default new PeoplesService();




 