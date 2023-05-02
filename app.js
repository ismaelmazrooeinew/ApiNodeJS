const express = require('express');

// const helmet=require('helmet');
 const morgan=require('morgan');
 const config=require('config');

 //برای اینکه بتوانیم از روتز استفاده کنیم
 const userRoute=require('./routes/users');






const app = express();



//اگر شما این میدل ور را ایجاد نکنید باعث می گردد که تمام ورودی ها را Undifine  بدهد 
//نکته میدل ور ها به صورت پشت سر هم اجرا می شود و مورد بعدی اینکه هر میدل وری که اجرای می شود می تواند برروی رکوست و رسپانس تاثیر بگذارد
app.use(express.json());

//اگر نیاز داشتیم اطلاعات را به صورت html ارسال کنیم و پارس کنیم می توانیم از این میدل ور استفاده کنیم
app.use(express.urlencoded({extended:true}));

//برای ارسال تصاویر به کاربر می توانیم از این میدل ور استفاده کنیم
app.use(express.static('public'));

//این کد می گوید هر درخواستی که به این آدرس آمد را به روت مورد نظر انتقال بده
app.use('/api/users',userRoute);

//this security helemet package
// app.use(helmet());


// process.env.NODE_ENV = 'production';

// console.log(process.env.NODE_ENV);

// console.log(app.get('env'));

process.env.NODE_ENV = 'development';

// process.env.experssapp_smskey=123456789;



// console.log("key sms",config.get('SMS.key'));



if(process.env.NODE_ENV==='development'){
  console.log(`this is envaurment ${app.get('env')} `);
  console.log('morgan is active');
  app.use(morgan('tiny'));

}

console.log("appname",config.get('appname'));
console.log("Setting",config.get('Setting'));
console.log("prductionid",config.get('Setting.prductionid'));


//اگر بخواهیم از محیط دولوپ در بایییم از این کد استفاده می کنیم
//in use terminal
//set NODE_ENV=production


app.get('/',(req,res)=>{
  res.send([{name:"ismael",lastanme:"mazrouei"},
  {name:"hosein",lastanme:"feizi"},
  {name:"rasol",lastanme:"baseri"},
  {name:"mehdi",lastanme:"khademi"}

]);
res.end();
});






const portt=process.env.PORT ||3000;
app.listen(portt,()=>{
  console.log('service is start  ${portt} ');
});