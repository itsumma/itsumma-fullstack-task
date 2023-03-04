import prisma from "@/backend/lib/prisma";
import {FamilyMember} from "@/interfaces/family-member";

class FamilyMemberService {

    async findAll(){
        return prisma.familyMember.findMany()
    }

    async findById(id:string){
        return prisma.familyMember.findUnique({where:{id}})
    }

    async create(body:FamilyMember) {
        return prisma.familyMember.create({
            data: body
        })
    }

    async delete(id:string){
        return prisma.familyMember.delete({where: {id}})
    }

    async update(id: string, body: Partial<FamilyMember>){
        return prisma.familyMember.update({
            where:{ id},
            data: body
        })
    }
}
const familyMemberService = new FamilyMemberService();
export default familyMemberService
