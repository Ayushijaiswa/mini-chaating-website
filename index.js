const express=require("express")
const Chat=require('./models/chat')
const methodOverride=require('method-override')
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const port=3000;
main().then(()=>{
    console.log("connection successfull")
}).catch(e=>console.log(e));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
}
app.use(methodOverride('_method'))
 app.set("views",path.join(__dirname,"views"))
 app.set("view engine ","ejs");
 app.use(express.static(path.join(__dirname,"public")))
 app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send("welcome");

})
app.get('/chats',async(req,res)=>{
   let chats=  await Chat.find();
   console.log(chats)
   res.render("index.ejs",{chats})
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
app.post('/chats',(req,res)=>{
    let {from,msg,to}=req.body;
    let newchat=new Chat({
      from:from,
      msg:msg,
      to:to,
      created_at:new Date
    })
    newchat.save()
    .then(res=>console.log("chat is saved"))
    .catch(err=>console.log(err));
     res.redirect('/chats')
})
app.get('/chats/:id/edit',async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);

    res.render("edit.ejs",{chat})
})
app.put('/chats/:id', async(req,res)=>{
    let {id}=req.params;
    let{msg}=req.body;
    let updatedchats= await Chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true,new:true})
    console.log(updatedchats)
    res.redirect('/chats')
})
app.delete('/chats/:id',async(req,res)=>{
    let{id}=req.params;
    console.log(id)
  await  Chat.findByIdAndDelete(id)
  res.redirect('/chats')
})



app.listen(port,()=>{
    console.log("app is listening")
})