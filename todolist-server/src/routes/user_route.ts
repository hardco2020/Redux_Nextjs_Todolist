import express from 'express'
import { Category } from '../entities/category';
import { User } from '../entities/user';
const router =  express.Router();

router.post('/api/user',async(req:express.Request,res:express.Response)=>{
    const { account,password } = req.body
    //要確認是否有重複
    const user = await User.findOne({account:account})
    if(user){ //如果帳號重複
        return res.status(409).json({msg:"帳號已重複"})
    }
    const new_user = User.create({
        account:account,
        password:password
    })
    //應該要額外創default category for user
    
    const cateogory1 = Category.create({
        id:Date.now().toString(),
        name:'myday',
        user:new_user
    })
    const cateogory2 = Category.create({
        id:(Date.now()+1).toString(),
        name:'work',
        user:new_user
    })
    const cateogory3 = Category.create({
        id:(Date.now()+2).toString(),
        name:'plan',
        user:new_user
    })
    const cateogory4 = Category.create({
        id:(Date.now()+3).toString(),
        name:'important',
        user:new_user
    })
    await new_user.save();
    await cateogory1.save();
    await cateogory2.save();
    await cateogory3.save();
    await cateogory4.save();

    return res.status(201).json(new_user);
});

router.post('/api/user/login',async(req:express.Request,res:express.Response)=>{
    const { account,password } = req.body
    const user = await User.findOne(account)
    if(!user){
        return res.status(404).json({msg:"User not found"})
    }
    if(password !== user.password){
        return res.status(404).json({msg:"Password incorrect"})
    }
    //console.log(req.session.userId)
    //到時候要加入session的處理
    return res.status(200).json(user)
    //應該要額外創default category for user
});

//login 

// router.post('/api/user/login',async(req:express.Request,res:express.Response)=>{
//     const { account,password } = req.body
    
// });



export{
    router as userRouter
}