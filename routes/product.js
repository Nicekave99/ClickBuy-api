const express = require("express");
const router = express.Router();
// Controllers
const {
  create,
  list,
  read,
  remove,
  update,
  listby,
  searchFilters,
  createImages,
  removeImage,
  searchProducts,
} = require("../controllers/product");
const { adminCheck, authCheck } = require("../middlewares/authCheck");
//@ENDPOINT https://clickbuy-api.vercel.app/api/product
router.post("/product", create);
router.get("/products/:count", list);
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);
router.get("/products/search/:keyword", searchProducts);

router.post("/images", authCheck, adminCheck, createImages);
router.post("/removeimages", authCheck, adminCheck, removeImage);

module.exports = router;
