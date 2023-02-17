import {pool} from '../index';

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

  async updatePerson(personId: number, person: Person) {
    try {
      const result = await pool.query('UPDATE items SET item_title = $1 WHERE item_id = $2 RETURNING *', [person.name, personId]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deletePerson(personId: number) {
    try {
      const result = await pool.query('DELETE FROM items WHERE item_id = $1 RETURNING *', [personId]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default new PeoplesService();
