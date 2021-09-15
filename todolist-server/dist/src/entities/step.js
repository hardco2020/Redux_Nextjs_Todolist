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
exports.Step = void 0;
const typeorm_1 = require("typeorm");
const TodoItem_1 = require("./TodoItem");
let Step = class Step extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Step.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Step.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        default: false
    }),
    __metadata("design:type", Boolean)
], Step.prototype, "completed", void 0);
__decorate([
    typeorm_1.ManyToOne(() => TodoItem_1.TodoItem, todoItem => todoItem.steps, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({
        name: 'todo_id'
    }),
    __metadata("design:type", TodoItem_1.TodoItem)
], Step.prototype, "todoItem", void 0);
Step = __decorate([
    typeorm_1.Entity('steps')
], Step);
exports.Step = Step;
//# sourceMappingURL=step.js.map