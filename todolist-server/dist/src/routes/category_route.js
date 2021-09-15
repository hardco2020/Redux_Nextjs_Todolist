"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../entities/user");
const category_1 = require("../entities/category");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.get('/api/user/:userId/category', async (req, res) => {
    const { userId } = req.params;
    const category = await category_1.Category.find({ where: { user: userId } });
    return res.status(200).json(category);
});
router.post('/api/user/:userId/category', async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const user = await user_1.User.findOne((userId));
    if (!user) {
        return res.status(404).json({ msg: "User not exists" });
    }
    const new_category = category_1.Category.create({
        id: Date.now().toString(),
        name,
        user
    });
    new_category.save();
    return res.status(201).json(new_category);
});
router.put('/api/category', async (req, res) => {
    const category = req.body;
    category_1.Category.save(category);
    return res.status(200).json(category);
});
router.delete('/api/category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const category = await category_1.Category.findOne(categoryId);
    if (!category) {
        return res.status(404).json({ msg: "category not found" });
    }
    await category_1.Category.remove(category);
    return res.status(200).json(category);
});
//# sourceMappingURL=category_route.js.map