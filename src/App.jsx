import { useEffect, useState } from "react";
import API from "/src/api.js";

import TaskForm from "/components/TaskForm.jsx";
import TaskList from "/components/TaskList.jsx";
import SearchBar from "/components/SearchBar.jsx";

function App() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/");
            setTasks(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">

            <h1>Todo List</h1>

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