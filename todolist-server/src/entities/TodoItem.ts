import {Entity ,BaseEntity, Column, OneToMany, ManyToMany, PrimaryColumn} from 'typeorm'
import { Category } from './category';
import { Step } from './step';


@Entity('todoItem')
export class TodoItem extends BaseEntity{
    @PrimaryColumn()
    id:string;
    @Column()
    completed:boolean;
    
    @Column()
    title: string; 

    @Column({
        nullable:true
    })
    noticeTime:Date

    @Column({
        nullable:true 
    })
    dueTime:Date

    @Column({
        nullable:true
    })
    note :string;

    @OneToMany(
        ()=> Step,
        steps =>  steps.todoItem
        ,{onDelete: "CASCADE"}
    )
    steps : Step[]
    // @Column()
    // steps:string;

    @ManyToMany(
        ()=>Category,
        category => category.todos
    )
    categories:Category[]

   

}