"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const step_1 = require("./entities/step");
const user_1 = require("./entities/user");
const TodoItem_1 = require("./entities/TodoItem");
const category_1 = require("./entities/category");
const user_route_1 = require("./routes/user_route");
const todo_route_1 = require("./routes/todo_route");
const category_route_1 = require("./routes/category_route");
const step_router_1 = require("./routes/step_router");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const main = async () => {
    try {
        require('dotenv').config();
        await typeorm_1.createConnection({
            type: "postgres",
            host: process.env.SERVER_IP,
            port: 5432,
            database: process.env.DATABASE,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            logging: true,
            synchronize: true,
            entities: [step_1.Step, user_1.User, TodoItem_1.TodoItem, category_1.Category]
        });
        console.log('Connected to postgres');
    }
    catch (error) {
        console.log(error);
        console.error('Unable to connect to posgres');
    }
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        port: 6379,
        host: process.env.SERVER_IP
    });
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(express_session_1.default({
        name: "UserCookie",
        store: new RedisStore({
            client: redisClient,
        }),
        saveUninitialized: false,
        secret: 'some secret',
        resave: false,
    }));
    app.use(user_route_1.userRouter);
    app.use(todo_route_1.todoRouter);
    app.use(category_route_1.categoryRouter);
    app.use(step_router_1.stepRouter);
    app.listen(3001, () => {
        console.log("server will be started port");
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map