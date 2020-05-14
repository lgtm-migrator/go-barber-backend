import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsCtrl from '../controllers/AppointmentsCtrl';

const router = Router();
const controller = new AppointmentsCtrl();

router.use(ensureAuthenticated);

router.get('/', controller.index);
router.post('/', controller.create);

export default router;