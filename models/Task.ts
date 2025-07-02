import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    id: {type:Number},
    title: {type:String},
    description: {type:String},
    status: {type:String},
    dueDate: { type: Date, timestamps: true }
   
})


const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema)

export default Task;