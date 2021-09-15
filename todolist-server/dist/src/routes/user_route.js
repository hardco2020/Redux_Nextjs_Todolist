"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../entities/category");
const user_1 = require("../entities/user");
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/api/user', async (req, res) => {
    const { account, password } = req.body;
    const user = await user_1.User.findOne({ account: account });
    if (user) {
        return res.status(409).json({ msg: "帳號已重複" });
    }
    const new_user = user_1.User.create({
        account: account,
        password: password
    });
    const cateogory1 = category_1.Category.create({
        id: Date.now().toString(),
        name: 'myday',
        user: new_user
    });
    const cateogory2 = category_1.Category.create({
        id: (Date.now() + 1).toString(),
        name: 'work',
        user: new_user
    });
    const cateogory3 = category_1.Category.create({
        id: (Date.now() + 2).toString(),
        name: 'plan',
        user: new_user
    });
    const cateogory4 = category_1.Category.create({
        id: (Date.now() + 3).toString(),
        name: 'important',
        user: new_user
    });
    await new_user.save();
    await cateogory1.save();
    await cateogory2.save();
    await cateogory3.save();
    await cateogory4.save();
    return res.status(201).json(new_user);
});
router.post('/api/user/login', async (req, res) => {
    const { account, password } = req.body;
    const user = await user_1.User.findOne(account);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    if (password !== user.password) {
        return res.status(404).json({ msg: "Password incorrect" });
    }
    return res.status(200).json(user);
});
//# sourceMappingURL=user_route.js.map