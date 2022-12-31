import { Request, Response } from "express";
import { CheckSubscriptionService } from "../../services/user/CheckSubscriptionService";

class CheckSubcriptionController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id

        const checkSubscriptionService = new CheckSubscriptionService()

        const status = await checkSubscriptionService.execute({ user_id })

        return res.json(status)
    }
}

export { CheckSubcriptionController }