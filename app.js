const express = require('express');
const {body,validationResult}=require('express-validator');

let users=require('./users');

const app = express();
//------for log
app.use(function responseLogger(req, res, next) {
  const originalSendFunc = res.send.bind(res);
  res.send = function(body) {
    console.log(body);    // do whatever here
    return originalSendFunc(body);
  };
  next();
});
//=---------------------------------------------------



app.get('/',(req,res)=>{
  res.send([{name:"ismael",lastanme:"mazrouei"},
  {name:"hosein",lastanme:"feizi"},
  {name:"rasol",lastanme:"baseri"},
  {name:"mehdi",lastanme:"khademi"}

]);
res.end();
});


app.get('/api/users',(req,res)=>{
  res.json({
    data: users,
    message: "ok"
  });
  res.end();
});


// app.post('/api/users',(req,res)=>{
//   users.push({id:users.length+1, ...req.body});
//   res.status(200).json({data:users,message:"ok"});
// });
app.post("/api/users",[body('email','email is not foramt valid').isEmail(),body('first_name','firstname is not valid').notEmpty(),body('last_name','lastname is not valid').notEmpty(),]
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




app.get('/api/users/:id',(req,res)=>{
  const user=users.find((u)=> u.id===parseInt(req.params.id));
  if(!user) {
    return res.status(404).json({data:null,message:'the user with you request not found in list user pleaze try again...'}); 
    
  }
  
  res.status(200).json({data:user,message:"ok"});
});

// app.get('/api/users/:id',(req,res)=>{
//   res.write(`id:${req.params.id },username:${req.params.id}`);
// //   res.send( [{name:"maz",id:1,lastanme:"mazrouei",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"maz",id:1,lastanme:"mazrouei",fullname:"mazandarani",brithdate:"1402/02/12"},
// //   {name:"ak",id:1,lastanme:"akbari",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"na",id:1,lastanme:"yousefi",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"ya",id:1,lastanme:"korasani",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"da",id:1,lastanme:"kasarai",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"ba",id:1,lastanme:"neidani",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"ka",id:1,lastanme:"nekoee",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"ia",id:1,lastanme:"neisani",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"ta",id:1,lastanme:"nimrouzi",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"na",id:1,lastanme:"sohrevandi",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"oa",id:1,lastanme:"rayegan",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},
// //   {name:"we",id:1,lastanme:"lotfi",fullname:"ismaelmazrooei",brithdate:"1402/02/12"},


// // ]);
// res.end();

// });


const portt=process.env.PORT ||3000;
app.listen(portt,()=>{
  console.log('service is start  ${portt} ');
});