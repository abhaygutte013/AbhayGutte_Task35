import { useState } from "react";
import API from "/src/api.js";

function TaskList({ tasks, fetchTasks }) {

    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const deleteTask = async (id) => {
        try {
            const confirmDelete = window.confirm("Delete this task?");

if(!confirmDelete) return;

await API.delete(`/${id}`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async(task)=>{

    try{

        await API.patch(`/${task._id}/status`,{
            status:
            task.status==="Pending"
            ?"Completed"
            :"Pending"
        });

        fetchTasks();

    }catch(error){
        console.log(error);
    }

}

    const startEdit = (task) => {
        setEditId(task._id);
        setTitle(task.title);
        setDescription(task.description);
    };

    const saveEdit = async () => {

        try {

            await API.put(`/${editId}`, {
                title,
                description,
                status: "Pending"
            });

            setEditId(null);
            setTitle("");
            setDescription("");

            fetchTasks();

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div className="task-list">

            {tasks.map((task) => (

                <div key={task._id} className="task-card">

                    {
                        editId === task._id ?

                            <>
                                <input
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                />

                                <input
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />

                                <button onClick={saveEdit}>
                                    Save
                                </button>

                                <button onClick={()=>setEditId(null)}>
                                    Cancel
                                </button>
                            </>

                            :

                            <>
                                <h2>{task.title}</h2>

                                <p>{task.description}</p>

                                <p>
                                    <strong>Status:</strong> {task.status}
                                </p>

                                <button
                                    onClick={() => startEdit(task)}
                                >
                                    Edit
                                </button>

                                <button onClick={()=>updateStatus(task)}>
                                    Change Status
                                </button>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>
                            </>

                    }

                </div>

            ))}

        </div>

    );
}

export default TaskList;