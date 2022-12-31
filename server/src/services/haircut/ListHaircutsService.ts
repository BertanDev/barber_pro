import prismaClient from "../../prisma"

interface ListHaircutsRequest {
    user_id: string
    status: boolean | string
}

class ListHaircutsService {
    async execute({ user_id, status }: ListHaircutsRequest) {
        
        const haircuts = await prismaClient.haircut.findMany({
            where: {
                user_id: user_id,
                status: status === 'true' ? true : false
            }
        })

        return haircuts
    }
}

export { ListHaircutsService }