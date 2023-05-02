
const express = require('express');
const {body,validationResult}=require('express-validator');
let users=require('../users');


//برای اینکه بتوانیم در صفحات دیگر به این متد ها دسترسی پیدا کنیم باید از متد Routes  استفاده کنیم

const Router=express.Router();

Router.get('/',(req,res)=>{
  res.json({
    data: users,
    message: "ok"
  });
  res.end();Router
});



Router.post("/",[
 body('email','email is not foramt valid').isEmail()
,body('first_name','firstname is not valid').notEmpty()
,body('last_name','lastname is not valid').notEmpty()]
,(req, res) => {
  const error=validationResult(req);
  console.log(error.array());
  if(!error.isEmpty())
  {
    return res.status(400).json({data:null,errors:error.array(),message:'valiadtion is error'});
  }
  users.push({ id: users.length + 1, ...req.body });
  res.json({
    data: users,
    message: "ok",
  });
});


Router.put("/:id",[body('email','email is not foramt valid').isEmail(),body('first_name','firstname is not valid').notEmpty(),body('last_name','lastname is not valid').notEmpty(),]
,(req, res) => {
const user=users.find(x=>x.id==req.params.id);
if(!user)
{
  return res.status(404).json({data:null,message:'data user is not find for update'});
}



  const errors=validationResult(req);
  console.log(req.body);
  if(!errors.isEmpty())
  {
    return res.status(400).json({data:null,error:errors.array(),message:'valiadtion is error'});
  }
  users=users.map(u=>{
    if(u.id==req.params.id)
    {
      return {...u,...req.body};
    }
    return u;
  });
  res.json({
    data: users,
    message: "ok",
  });
});



Router.delete("/:id"
,(req, res) => {
const user=users.find(x=>x.id==req.params.id);
if(!user)
{
  return res.status(404).json({data:null,message:'data user is not find for update'});
}

const indexuser=users.indexOf(user,1);
users.splice(indexuser);
res.json({
  data: users,
  message: "ok",
});
 });




Router.get('/:id',(req,res)=>{
  const user=users.find((u)=> u.id===parseInt(req.params.id));
  if(!user) {
    return res.status(404).json({data:null,message:'the user with you request not found in list user pleaze try again...'}); 
   }
    res.status(200).json({data:user,message:"ok"});
});



//برای اینکه بتوانیم در قسمت های دیگر دسترسی داشته باشیم
module.exports=Router;