import { Request, Response } from "express";
import { SubcribeService } from "../../services/subscriptions/SubcribeService";

class SubscribeController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id

        const subcribeService = new SubcribeService()

        const subscribe = await subcribeService.execute({
            user_id
        })

        return res.json(subscribe)
    }
}

export {SubscribeController}