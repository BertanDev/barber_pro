import prismaClient from "../../prisma"

interface FinishScheduleRequest {
    user_id: string
    schedule_id: string
}

class FinishScheduleService {
    async execute({ schedule_id, user_id }: FinishScheduleRequest) {

        if(schedule_id === '' || user_id === '') {
            throw new Error("Error")
        }

        try {

            const belongsToUser = await prismaClient.service.findFirst({
                where: {
                    user_id: user_id,
                    id: schedule_id
                }
            })

            if(!belongsToUser) {
                throw new Error("Not authorized")
            }

            await prismaClient.service.delete({
                where: {
                    id: schedule_id
                }
            })

            return { message: "Finalizado com sucesso!" }

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export { FinishScheduleService }