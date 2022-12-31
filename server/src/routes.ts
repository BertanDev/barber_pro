import express, { Router } from 'express'


import { isAuthenticated } from './middlewares/isAuthenticated'

import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { UserDetailController } from './controllers/user/UserDetailController'
import { UpdateUserController } from './controllers/user/UpdateUserController'
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController'
import { ListHaircutsController } from './controllers/haircut/ListHaircutController'
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController'
import { CheckSubcriptionController } from './controllers/user/CheckSubscriptionController'
import { CountHaircutController } from './controllers/haircut/CountHaircutController'
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController'
import { NewScheduleController } from './controllers/schedule/NewScheduleController'
import { ListScheduleController } from './controllers/schedule/ListScheduleController'
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController'
import { SubscribeController } from './controllers/subscriptions/SubcribeController'
import { WebhooksController } from './controllers/subscriptions/WebhooksController'
import { CreatePortalController } from './controllers/subscriptions/CreatePortalController'

const router = Router()

// User Routes
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new UserDetailController().handle)

router.put('/users', isAuthenticated, new UpdateUserController().handle)

router.get('/check', isAuthenticated, new CheckSubcriptionController().handle)

//Haircut Routes

router.post('/haircut', isAuthenticated, new CreateHaircutController().handle)

router.get('/haircuts', isAuthenticated, new ListHaircutsController().handle)

router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)

router.get('/haircut/count', isAuthenticated, new CountHaircutController().handle)

router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)

// Schedule Routes

router.post('/schedule', isAuthenticated, new NewScheduleController().handle)

router.get('/schedules', isAuthenticated, new ListScheduleController().handle)

router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

// Payment Routes

router.post('/subscribe', isAuthenticated, new SubscribeController().handle)

router.post('/webhooks', express.raw({ type: 'application/json' }), new WebhooksController().handle)

router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)

export { router }

