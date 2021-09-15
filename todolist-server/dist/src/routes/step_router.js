"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepRouter = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const step_1 = require("../entities/step");
const TodoItem_1 = require("../entities/TodoItem");
const router = express_1.default.Router();
exports.stepRouter = router;
router.post('/api/todo/:todoId/step', async (req, res) => {
    const { todoId } = req.params;
    const { title, completed } = req.body;
    const todo = await TodoItem_1.TodoItem.findOne({ id: todoId });
    if (!todo) {
        return res.status(404).json({ msg: "Todo not exists" });
    }
    const new_step = step_1.Step.create({
        id: "step" + Date.now(),
        title,
        completed,
        todoItem: todo
    });
    new_step.save();
    return res.status(201).json(new_step);
});
router.get('/api/todo/:todoId/step', async (req, res) => {
    const { todoId } = req.params;
    const steps = await step_1.Step.find({ where: { todoItem: todoId } });
    return res.status(200).json(steps);
});
router.get('/api/user/:userId/step', async (req, res) => {
    const { userId } = req.params;
    const steps = await typeorm_1.getRepository(step_1.Step)
        .createQueryBuilder("steps")
        .leftJoinAndSelect('steps.todoItem', 'todoItem')
        .leftJoin('todoItem.categories', 'categories')
        .leftJoin('categories.user', 'user')
        .where('user.account=:id', { id: userId })
        .distinct(true)
        .getMany();
    return res.status(200).json(steps);
});
router.put('/api/step', async (req, res) => {
    const new_step = req.body;
    step_1.Step.save(new_step);
    return res.status(200).json(new_step);
});
router.delete('/api/step/:stepId', async (req, res) => {
    const { stepId } = req.params;
    const step = await step_1.Step.findOne({ id: stepId });
    if (!step) {
        return res.status(404).json({ msg: "step not found" });
    }
    await step_1.Step.remove(step);
    return res.status(200).json(stepId);
});
//# sourceMappingURL=step_router.js.map