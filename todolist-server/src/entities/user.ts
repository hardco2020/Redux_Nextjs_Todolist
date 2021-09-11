import {Entity ,BaseEntity, Column, PrimaryColumn, OneToMany} from 'typeorm'
import { Category } from './category';


@Entity('users')
export class User extends BaseEntity{
    @PrimaryColumn()
    account:string;

    @Column()
    password:string;
    
    @OneToMany(
        ()=> Category,
        categories=> categories.user
    )
    categoires:Category[]

}