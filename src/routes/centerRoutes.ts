import { Router } from "express";
import centerController from '../controllers/CenterController';

const router = Router();

router.get('/', centerController.fetchCenters);
router.post('/', centerController.createCenter);
router.get('/:id', centerController.getCenterById);
router.put('/:id', centerController.updateCenter);
router.delete('/:id', centerController.deleteCenter);

export default router;