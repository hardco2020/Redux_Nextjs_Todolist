"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../entities/category");
const TodoItem_1 = require("../entities/TodoItem");
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
exports.todoRouter = router;
router.post('/api/category/:categoryId/todo', async (req, res) => {
    const { title, completed } = req.body;
    const { categoryId } = req.params;
    const category = await category_1.Category.findOne(parseInt(categoryId));
    if (category) {
        const todo = new TodoItem_1.TodoItem();
        todo.id = "todo" + Date.now();
        todo.title = title;
        todo.completed = completed;
        todo.categories = [category];
        await todo.save();
        res.status(200).json(todo);
    }
});
router.delete('/api/category/:categoryId/todo/:todoId', async (req, res) => {
    const { categoryId, todoId } = req.params;
    const todo = await TodoItem_1.TodoItem.findOne({ id: todoId }, { relations: ['categories'] });
    if (!todo) {
        return res.status(404).json({ msg: "Can't find todo " });
    }
    todo.categories = todo.categories.filter((c) => c.id !== categoryId);
    await todo.save();
    return res.status(200).json(todo);
});
router.post('/api/category/:categoryId/todo/:todoId', async (req, res) => {
    const { categoryId, todoId } = req.params;
    const category = await category_1.Category.findOne({ id: categoryId });
    const todo = await TodoItem_1.TodoItem.findOne({ id: todoId }, { relations: ['categories'] });
    if (!category || !todo) {
        return res.status(404).json({ msg: "Can't find category or todo " });
    }
    todo.categories.push(category);
    await todo.save();
    return res.status(200).json(todo);
});
router.get('/api/category/:categoryId/todo', async (req, res) => {
    const { categoryId } = req.params;
    const response = await typeorm_1.getRepository(TodoItem_1.TodoItem)
        .createQueryBuilder("todoItem")
        .leftJoinAndSelect('todoItem.categories', 'categories')
        .where('categories.id=:id', { id: categoryId })
        .getMany();
    return res.status(200).json(response);
});
router.get('/api/user/:userId/todo', async (req, res) => {
    const { userId } = req.params;
    const response = await typeorm_1.getRepository(TodoItem_1.TodoItem)
        .createQueryBuilder("todoItem")
        .leftJoinAndSelect('todoItem.categories', 'categories')
        .leftJoin('categories.user', 'user')
        .where('user.account=:id', { id: userId })
        .distinct(true)
        .getMany();
    return res.status(200).json(response);
});
router.put('/api/todo', async (req, res) => {
    const new_todo = req.body;
    try {
        TodoItem_1.TodoItem.save(new_todo);
        return res.status(200).json(new_todo);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ "msg": "Not giving right array " });
    }
});
router.delete('/api/todo/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const todo = await TodoItem_1.TodoItem.findOne(todoId);
    console.log(todo);
    if (!todo) {
        return res.status(404).json({ msg: "todo not found" });
    }
    await TodoItem_1.TodoItem.remove(todo);
    return res.status(200).json(todoId);
});
//# sourceMappingURL=todo_route.js.map