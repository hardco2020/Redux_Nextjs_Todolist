import {Entity ,BaseEntity, Column, PrimaryGeneratedColumn,ManyToMany, JoinTable, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm'
import { TodoItem } from './TodoItem';
import { User } from './user';


@Entity('categories')
export class Category extends BaseEntity{
    @PrimaryColumn({type: 'bigint'})
    id:string;

    @Column()
    name:string;

    @ManyToMany(
        ()=>TodoItem, 
        todoItem => todoItem.categories
        ,{onDelete:"CASCADE"}
    ) 
    @JoinTable({
        name:"categories_todos",
        joinColumn:{
            name:"categories", 
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"todos",
            referencedColumnName:"id"
        }
    })    
    todos:TodoItem[]

    @ManyToOne(
        ()=>User,
        user=>user.categoires
    )
    @JoinColumn({
        name: 'user_id'
    })
    user:User
}