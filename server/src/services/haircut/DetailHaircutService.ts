import prismaClient from "../../prisma"

interface DetailHaircutRequest {
    haircut_id: string
}

class DetailHaircutService {
    async execute({ haircut_id }: DetailHaircutRequest) {

        const haircut = await prismaClient.haircut.findFirst({
            where: {
                id: haircut_id
            }
        })

        return haircut
    }
}

export { DetailHaircutService }