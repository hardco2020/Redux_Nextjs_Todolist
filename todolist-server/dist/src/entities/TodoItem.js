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
exports.TodoItem = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("./category");
const step_1 = require("./step");
let TodoItem = class TodoItem extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], TodoItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "completed", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TodoItem.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", Date)
], TodoItem.prototype, "noticeTime", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", Date)
], TodoItem.prototype, "dueTime", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], TodoItem.prototype, "note", void 0);
__decorate([
    typeorm_1.OneToMany(() => step_1.Step, steps => steps.todoItem, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], TodoItem.prototype, "steps", void 0);
__decorate([
    typeorm_1.ManyToMany(() => category_1.Category, category => category.todos),
    __metadata("design:type", Array)
], TodoItem.prototype, "categories", void 0);
TodoItem = __decorate([
    typeorm_1.Entity('todoItem')
], TodoItem);
exports.TodoItem = TodoItem;
//# sourceMappingURL=TodoItem.js.map