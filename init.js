const mongoose=require("mongoose");
const Chat=require('./models/chat')
main().then(()=>{
    console.log("connection successfull")
}).catch(e=>console.log(e));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp")
}
const chatAll=[
    {
        from:"ayushi",
        to:"partu",
        msg:"hii there",
        created_at:new Date()
    },
    {
        from:"arohi",
        to:"parth",
        msg:"notes send",
        created_at:new Date()
    },
    {
        from:"ayush",
        to:"vaibhav",
        msg:"exams are comming",
        created_at:new Date()
    },
    {
        from:"ayu",
        to:"partu",
        msg:"hii there diwali",
        created_at:new Date()
    },
    {
        from:"ayushi",
        to:"partiksha",
        msg:"hii there gm",
        created_at:new Date()
    },
    {
        from:"ayushi",
        to:"arru",
        msg:"hii there gn",
        created_at:new Date()
    },
]
Chat.insertMany(chatAll);