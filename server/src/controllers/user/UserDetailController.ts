import { Request, Response } from "express"
import { UserDetailService } from "../../services/user/UserDetailService"

class UserDetailController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id

        const userDetailService = new UserDetailService()

        const user = await userDetailService.execute(user_id)

        return res.json(user)
    }
}

export { UserDetailController }