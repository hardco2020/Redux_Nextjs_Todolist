import express from 'express'
import { Category } from '../entities/category';
import { TodoItem } from '../entities/TodoItem';
import { getRepository } from "typeorm";
const router =  express.Router();

// create a new Todo
router.post('/api/category/:categoryId/todo',async(req:express.Request,res:express.Response)=>{
    const { title,completed } = req.body
    const { categoryId } = req.params
    
    //const category = await  Category.findOne(parseInt(categoryId),{relations:['todos']})
    const category = await  Category.findOne(parseInt(categoryId))
    if(category){
        const todo = new TodoItem()
        todo.id = "todo"+Date.now()
        todo.title = title
        todo.completed = completed
        todo.categories = [category]
        await todo.save()
        res.status(200).json(todo)
    }
});

//remove Todo from a category 
router.delete('/api/category/:categoryId/todo/:todoId',async(req:express.Request,res:express.Response)=>{
    const { categoryId,todoId } = req.params
    const todo = await TodoItem.findOne( {id:todoId},{relations:['categories']})
    if(!todo){
        return res.status(404).json({msg:"Can't find todo "})
    }
    todo.categories = todo.categories.filter((c)=> c.id!==categoryId )
    await todo.save()
    return res.status(200).json(todo)
});

//add Todo  to a category
router.post('/api/category/:categoryId/todo/:todoId',async(req:express.Request,res:express.Response)=>{
    const { categoryId,todoId } = req.params
    const category = await Category.findOne({id:categoryId}) 
    const todo = await TodoItem.findOne( {id:todoId},{relations:['categories']})
    if(!category|| !todo){
        return res.status(404).json({msg:"Can't find category or todo "})
    }
    todo.categories.push(category)
    await todo.save()
    return res.status(200).json(todo)
});

//get User's todo
router.get('/api/category/:categoryId/todo',async(req:express.Request,res:express.Response)=>{
  const { categoryId } = req.params
  const response = await getRepository(TodoItem)
    .createQueryBuilder("todoItem")
    .leftJoinAndSelect('todoItem.categories', 'categories')
    .where('categories.id=:id',{id:categoryId})
    .getMany();

  return res.status(200).json(response)
});

router.get('/api/user/:userId/todo',async(req:express.Request,res:express.Response)=>{
    const { userId } = req.params
    const response = await getRepository(TodoItem)
    .createQueryBuilder("todoItem")
    .leftJoinAndSelect('todoItem.categories', 'categories')
    .leftJoin('categories.user', 'user')
    .where('user.account=:id',{id: userId})
    .distinct(true)
    .getMany();
    return res.status(200).json(response)
  });

//update Todo's 
router.put('/api/todo',async(req:express.Request,res:express.Response)=>{
    const new_todo = req.body
    // const todo = TodoItem.findOne(parseInt(todoId))
    // if(!todo){
    //     return res.status(404).json({msg:"Can't not find todo"})
    // }
    //如果todo裡面含有Id就不需要router了？
    try{
        TodoItem.save(
            new_todo
        )
        return res.status(200).json(new_todo)
    }catch(err){
        console.log(err)
        return res.status(404).json({"msg":"Not giving right array "}) 
    }
});
//Delete Todo's
router.delete('/api/todo/:todoId',async(req:express.Request,res:express.Response)=>{
    const { todoId } = req.params
    const todo = await TodoItem.findOne(todoId)
    console.log(todo)

    if(!todo){
        return res.status(404).json({msg:"todo not found"})
    }
    await TodoItem.remove(todo)
    return res.status(200).json(todoId) 
});

export{
    router as todoRouter
}