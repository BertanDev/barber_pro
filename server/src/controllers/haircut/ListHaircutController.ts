import { Request, Response } from "express";
import { ListHaircutsService } from "../../services/haircut/ListHaircutsService";

class ListHaircutsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id
        const status = req.query.status as string

        const listHaircutsService = new ListHaircutsService()

        const haircuts = await listHaircutsService.execute({ user_id, status })

        return res.json(haircuts)
    }
}

export { ListHaircutsController }