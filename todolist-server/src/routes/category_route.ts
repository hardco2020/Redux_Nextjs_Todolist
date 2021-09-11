import express from 'express'
import { User } from '../entities/user';
import { Category } from '../entities/category';
const router =  express.Router();

//get user's category bt UserId  SELECT *  from category where user = userId
router.get('/api/user/:userId/category',async(req:express.Request,res:express.Response)=>{
  //const user = await User.find({relations:['categoires']})
  const { userId } = req.params
  const category = await Category.find({where:{user:userId}})
  return res.status(200).json(category)
});

//Add user's category by userId 
router.post('/api/user/:userId/category',async(req:express.Request,res:express.Response)=>{
    const { userId } = req.params
    const { name } = req.body 
    const user = await User.findOne((userId)) 
    if(!user){      
        return res.status(404).json({msg:"User not exists"})
    }
    const new_category = Category.create({
        id: Date.now().toString(),
        name,
        user
    }) 
    new_category.save()
    return res.status(201).json(new_category)
});

//Update Category's name 
router.put('/api/category',async(req:express.Request,res:express.Response)=>{
    const category = req.body
    Category.save(
        category
    )
    return res.status(200).json(category)
});
//Delete Category
router.delete('/api/category/:categoryId',async(req:express.Request,res:express.Response)=>{
    const { categoryId } = req.params
    const category = await Category.findOne(categoryId)
    if(!category){
        return res.status(404).json({msg:"category not found"})
    }
    await Category.remove(category)
    return res.status(200).json(category) 
});


export{
    router as categoryRouter
}