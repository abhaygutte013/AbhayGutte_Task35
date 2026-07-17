import { useState } from "react";
import API from "/src/api.js";

function SearchBar({ setTasks, fetchTasks }) {
    const [keyword, setKeyword] = useState("");
    const searchTask = async () => {
        if (keyword === "") {
            fetchTasks();
            return;
        }
        try {
            const res = await API.get(`/search?keyword=${keyword}`);
            setTasks(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search Task"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={searchTask}>
                Search
            </button>
        </div>
    );
}
export default SearchBar;