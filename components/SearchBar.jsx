import { useState } from "react";
import API from "/src/api.js";

function SearchBar({ setTasks, fetchTasks }) {

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchTask = async () => {

        setError("");

        // If search box is empty, show all tasks
        if (keyword.trim() === "") {
            fetchTasks();
            return;
        }

        // Minimum validation
        if (keyword.trim().length < 2) {
            setError("Enter at least 2 characters to search.");
            return;
        }

        setLoading(true);

        try {

            const res = await API.get(`/search?keyword=${keyword}`);

            setTasks(res.data.data);

            if (res.data.data.length === 0) {
                setError("No matching tasks found.");
            }

        } catch (err) {

            console.log(err);

            setError("Unable to search tasks.");

        } finally {

            setLoading(false);

        }
    };

    const clearSearch = () => {

        setKeyword("");
        setError("");

        fetchTasks();
    };

    return (

        <div className="search-box">

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <input
                type="text"
                placeholder="Search Task"
                value={keyword}
                maxLength={30}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button
                onClick={searchTask}
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>

            <button
                type="button"
                onClick={clearSearch}
            >
                Clear
            </button>

        </div>

    );
}

export default SearchBar;
