import express from 'express'
import { getRepository } from 'typeorm';
import { Step } from '../entities/step';
import { TodoItem } from '../entities/TodoItem';
const router =  express.Router();

//create step by todoId
router.post('/api/todo/:todoId/step',async(req:express.Request,res:express.Response)=>{
    const { todoId } = req.params
    const { title,completed } = req.body 
    const todo = await TodoItem.findOne({id:todoId})
    if(!todo){      
        return res.status(404).json({msg:"Todo not exists"})
    }
    const new_step = Step.create({
        id:"step"+Date.now(),
        title,
        completed,
        todoItem:todo
    }) 
    new_step.save()
    return res.status(201).json(new_step)
});
//show step
router.get('/api/todo/:todoId/step',async(req:express.Request,res:express.Response)=>{
    const { todoId } = req.params
    const steps = await Step.find({where:{todoItem:todoId}})
    return res.status(200).json(steps)
});
//show user's step
router.get('/api/user/:userId/step',async(req:express.Request,res:express.Response)=>{
    const { userId } = req.params
    const steps = await getRepository(Step)
    .createQueryBuilder("steps")
    .leftJoinAndSelect('steps.todoItem', 'todoItem')
    .leftJoin('todoItem.categories', 'categories')
    .leftJoin('categories.user','user')
    .where('user.account=:id',{id: userId})
    .distinct(true)
    .getMany();
    return res.status(200).json(steps)
});
//update step
router.put('/api/step',async(req:express.Request,res:express.Response)=>{
    const new_step =  req.body
    // const step = Step.findOne({id:stepId})
    Step.save(new_step)
    return res.status(200).json(new_step)
});
//delete step
router.delete('/api/step/:stepId',async(req:express.Request,res:express.Response)=>{
    const { stepId} = req.params
    const step = await Step.findOne({id:stepId})
    if(!step){
        return res.status(404).json({msg:"step not found"})
    }
    await Step.remove(step)
    return res.status(200).json(stepId) 
});



export{
    router as stepRouter
}