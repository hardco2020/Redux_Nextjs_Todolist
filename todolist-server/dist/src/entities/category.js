"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const TodoItem_1 = require("./TodoItem");
const user_1 = require("./user");
let Category = class Category extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToMany(() => TodoItem_1.TodoItem, todoItem => todoItem.categories, { onDelete: "CASCADE" }),
    typeorm_1.JoinTable({
        name: "categories_todos",
        joinColumn: {
            name: "categories",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "todos",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Category.prototype, "todos", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, user => user.categoires),
    typeorm_1.JoinColumn({
        name: 'user_id'
    }),
    __metadata("design:type", user_1.User)
], Category.prototype, "user", void 0);
Category = __decorate([
    typeorm_1.Entity('categories')
], Category);
exports.Category = Category;
//# sourceMappingURL=category.js.map