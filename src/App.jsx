import { useEffect, useState } from "react";
import API from "/src/api.js";

import TaskForm from "/components/TaskForm.jsx";
import TaskList from "/components/TaskList.jsx";
import SearchBar from "/components/SearchBar.jsx";

function App() {

    const [tasks, setTasks] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Error message
    const [error, setError] = useState("");

    // Fetch all tasks
    const fetchTasks = async () => {

        setLoading(true);
        setError("");

        try {

            const res = await API.get("/");

            setTasks(res.data.data);

        } catch (err) {

            console.log(err);

            setError("Unable to load tasks. Please check if the server is running.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">

            <h1>Todo List</h1>

            {/* Error Message */}
            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {/* Loading Message */}
            {loading && (
                <p className="loading-message">
                    Loading tasks...
                </p>
            )}

            <SearchBar
                setTasks={setTasks}
                fetchTasks={fetchTasks}
            />

            <TaskForm
                fetchTasks={fetchTasks}
            />

            <TaskList
                tasks={tasks}
                fetchTasks={fetchTasks}
            />

        </div>
    );
}

export default App;
