import { useState } from "react";
import API from "/src/api.js";

function TaskForm({ fetchTasks }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // Input Validation
        if (title.trim() === "" || description.trim() === "") {
            setError("Please enter all fields.");
            return;
        }

        if (title.trim().length < 3) {
            setError("Title should contain at least 3 characters.");
            return;
        }

        if (description.trim().length < 5) {
            setError("Description should contain at least 5 characters.");
            return;
        }

        if (title.length > 50) {
            setError("Title cannot exceed 50 characters.");
            return;
        }

        if (description.length > 200) {
            setError("Description cannot exceed 200 characters.");
            return;
        }

        setLoading(true);

        try {

            await API.post("/", {
                title,
                description,
                status: "Pending"
            });

            alert("Task Added Successfully");

            setTitle("");
            setDescription("");

            fetchTasks();

        } catch (err) {

            console.log(err);

            setError("Unable to add task. Please try again.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit} className="task-form">

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <input
                type="text"
                placeholder="Enter Task Title"
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Enter Description"
                value={description}
                maxLength={200}
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Task"}
            </button>

        </form>

    );
}

export default TaskForm;
