import { useState } from "react";
import API from "/src/api.js";

function TaskList({ tasks, fetchTasks }) {

    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Delete Task
    const deleteTask = async (id) => {

        const confirmDelete = window.confirm("Delete this task?");

        if (!confirmDelete) {
            return;
        }

        setLoading(true);
        setError("");

        try {

            await API.delete(`/${id}`);

            fetchTasks();

        } catch (err) {

            console.log(err);

            setError("Unable to delete task.");

        } finally {

            setLoading(false);

        }

    };

    // Change Status
    const updateStatus = async (task) => {

        setLoading(true);
        setError("");

        try {

            await API.patch(`/${task._id}/status`, {
                status:
                    task.status === "Pending"
                        ? "Completed"
                        : "Pending"
            });

            fetchTasks();

        } catch (err) {

            console.log(err);

            setError("Unable to update status.");

        } finally {

            setLoading(false);

        }

    };

    // Start Editing
    const startEdit = (task) => {

        setEditId(task._id);
        setTitle(task.title);
        setDescription(task.description);

    };

    // Save Edited Task
    const saveEdit = async () => {

        setError("");

        if (title.trim() === "" || description.trim() === "") {
            setError("Please enter all fields.");
            return;
        }

        if (title.trim().length < 3) {
            setError("Title should be at least 3 characters.");
            return;
        }

        if (description.trim().length < 5) {
            setError("Description should be at least 5 characters.");
            return;
        }

        setLoading(true);

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

        } catch (err) {

            console.log(err);

            setError("Unable to update task.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="task-list">

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {tasks.length === 0 ? (

                <p className="no-task">
                    No tasks found.
                </p>

            ) : (

                tasks.map((task) => (

                    <div key={task._id} className="task-card">

                        {

                            editId === task._id ?

                                <>

                                    <input
                                        value={title}
                                        maxLength={50}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <textarea
                                        value={description}
                                        rows="3"
                                        maxLength={200}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <button
                                        onClick={saveEdit}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>

                                    <button
                                        onClick={() => setEditId(null)}
                                        disabled={loading}
                                    >
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
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => updateStatus(task)}
                                        disabled={loading}
                                    >
                                        Change Status
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>

                                </>

                        }

                    </div>

                ))

            )}

        </div>

    );

}

export default TaskList;
