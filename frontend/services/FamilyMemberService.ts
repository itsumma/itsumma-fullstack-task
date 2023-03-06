export default class FamilyMemberService {
    async getAll(){
        const res = await fetch('http://localhost:5050/api/members');
        const members = await res.json();
        return members.data
    }

    async create(formData:FormData) {
        const res = await fetch('http://localhost:5050/api/member', {
            method: "POST",
            body: formData,
        });
        const result = await res.json()
        return result.data
    }

    async update(formData:FormData, id:string){
        const res = await fetch(`http://localhost:5050/api/member/${id}`, {
            method: "PATCH",
            body: formData,
        });
        const result = await res.json()
        return result.data
    }

    async remove(id:string){
        const res = await fetch(`http://localhost:5050/api/member/${id}`, {
            method: "DELETE",
        });
        const result = await res.json()
        return result.data
    }

    getById(){

    }

}
