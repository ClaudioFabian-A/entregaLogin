import mongoose from "mongoose";


const URL  = 
"mongodb+srv://gonzalezclaudiofabian3:Luz1567842242@cluster0.obkcdqv.mongodb.net/entregaintegradora?retryWrites=true&w=majority";
await mongoose.connect(URL, {

    serverSelectionTimeoutMS:6000,
});
console.log(`base en linea`);