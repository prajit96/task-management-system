import React, { useEffect, useState } from "react";
import { addtask, getTASKS } from "../Redux/Task-redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Input, Select, Textarea, Button, Box, Center } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import TaskSkeleton from "./TaskSkeleton";

const Task = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const tasks = useSelector((state) => state.task.tasks.data);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: false,
    priority: "",
    duedate: ""
  });

  const handleEditChange = (e) => setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  const [editedTask, setEditedTask] = useState({ title: "", description: "", priority: "", duedate: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const submitTaskData = () => {
    setIsAddingTask(true);
    setIsLoading(true);
    dispatch(addtask(taskData)).then(() => {
      setIsAddingTask(false);
      setIsLoading(false);
      setTaskData({
        title: "",
        description: "",
        status: false,
        priority: "",
        duedate: ""
      });
    });
  };

  useEffect(() => {
    dispatch(getTASKS());
  }, [dispatch, isAddingTask]); // Add isAddingTask to dependencies

  return (
    <div className="main-container-todo bg-gray-700" style={{backgroundColor: "#ADBBDA"}}>
      <div className="cont w-[25%] todo-container max-w-lg p-5 rounded-lg shadow-md">
        <h2 className="todo text-center text-2xl">Task Management System</h2>
        <div className="data flex justify-between">
          <p className="task-count"></p>
          <p className="completed-count"></p>
        </div>

        <div className="input-container flex flex-col gap-2">
          <Input mb={2}
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Add a new task"
            className="task-input"
          />
          <Select mb={2}
            className="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            placeholder="Select Priority"
          >
            <option value="urgent">Urgent</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
          <Box mb={2}>
                {/* <p>Due Date:</p> */}
                <Input
                  type="date"
                  name="duedate"
                  value={taskData.duedate}
                  onChange={handleChange}
                />
              </Box>
          <Textarea
            value={taskData.description}
            onChange={handleChange}
            name="description"
            placeholder="Description"
            className="desc"
          />
          <Button 
            onClick={submitTaskData}
            className="add-button"
            isLoading={isAddingTask}
            loadingText="Adding Task"
            style={{ minWidth: "100px" }}
          >
            Add Task
          </Button>
        </div>
      </div>
      <div className="todoContainerMain">
        {tasks ? (
          isLoading ? (
            <TaskSkeleton />
          ) : (
            <TaskItem data={tasks} />
          )
        ) : null}
      </div>
      
    </div>
    
  );
};

export default Task;
