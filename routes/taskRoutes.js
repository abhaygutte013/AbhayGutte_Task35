const express=require("express");
const router=express.Router();

const{
    createTask,getAllTasks,getTaskById,updateTask,deleteTask,searchTasks,updateStatus
}=require("../controllers/taskController");

router.post("/",createTask);
router.get("/search",searchTasks);
router.get("/",getAllTasks);
router.get("/:id",getTaskById);
router.put("/:id",updateTask);
router.patch("/:id/status",updateStatus);
router.delete("/:id",deleteTask);
module.exports=router;
