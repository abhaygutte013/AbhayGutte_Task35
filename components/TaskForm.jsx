import {useState} from "react";
import API from "/src/api.js";

function TaskForm({fetchTasks}){
    const[title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
        alert("Please enter all fields");
        return;
    }

    try {

        await API.post("/", {
            title,
            description,
            status:"Pending"
        });

        alert("Task Added Successfully");

        setTitle("");
        setDescription("");

        fetchTasks();

    } catch (error) {
        alert("Unable to Add Task");
        console.log(error);
    }
};
return(
    <form onSubmit={handleSubmit} className="task-form">
        <input type="text" placeholder="Enter Task Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>

        <input type="text" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)}/>

        <button type="submit">
            Add Task
        </button>

    </form>
);
}
export default TaskForm;