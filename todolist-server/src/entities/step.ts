import {Entity ,BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn} from 'typeorm'
import { TodoItem } from './TodoItem';

@Entity('steps')
export class Step extends BaseEntity{
    @PrimaryColumn()
    id:string;

    @Column()
    title:string;

    @Column({
        default:false
    })
    completed:boolean;

    @ManyToOne(
        ()=>TodoItem,
        todoItem => todoItem.steps
        ,{onDelete: "CASCADE"}
    )
    @JoinColumn({
        name: 'todo_id'
    })
    todoItem:TodoItem
}