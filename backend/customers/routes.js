const {Router} = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getCustomers);
router.get("/:sno", controller.getCustomersById);

module.exports = router;