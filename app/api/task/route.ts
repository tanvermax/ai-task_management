import connectiontoDatabase from "@/lib/mongooes";
import Task from "@/models/Task";
import { NextRequest,NextResponse } from "next/server";


interface TaskData {
    title: string;
    description: string;
    status: 'pending' | 'completed';
    dueDate: string;
}

export async function POST(req: NextRequest) {
    try {


        await connectiontoDatabase();

        const { title, description, status, dueDate }: TaskData = await req.json();
        const newTask = new Task({
            title,
            description,
            status,
            dueDate
        });
        await newTask.save()
        return NextResponse.json(
            { success: true, data: newTask },
            { status: 201 })
    } catch (error) {
        console.log(error);
    }
}


export async function GET(req: NextRequest) {
    try {
        const tasks = await Task.find();
        return NextResponse.json(
            { success: true, data: tasks },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}


export async function DELETE(req: NextRequest) {

    try {
        await connectiontoDatabase();
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json(
                { success: false, error: "Task ID is required" },
                { status: 400 }
            );
        }


        const deltedTask = await Task.findByIdAndDelete(id);

        if (!deltedTask) {
            return NextResponse.json(
                { success: false, error: "Task not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, data: deltedTask },
            { status: 200 }
        )


    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete task" },
            { status: 500 }
        );
    }

}