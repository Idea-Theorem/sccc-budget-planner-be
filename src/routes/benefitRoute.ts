import { Router } from "express";
import { authenication } from "../middlewares/authentication";
import validation from "../middlewares/validation";
import BenefitController from "../controllers/BenefitController";
import { benefitSchema } from "../validators/benefit";

const router = Router();


router.get('/:name?', authenication.verify, BenefitController.fetchBenefit);


router.post('/', authenication.verify, validation(benefitSchema.createBenefit), BenefitController.createBenefit);


router.get('/byId/:id', authenication.verify, BenefitController.getBenefitById);


router.put('/:id', authenication.verify, validation(benefitSchema.createBenefit), BenefitController.updateBenefit);

router.delete('/:id', authenication.verify, BenefitController.deleteBenefit);

export default router;