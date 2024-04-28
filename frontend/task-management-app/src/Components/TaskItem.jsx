import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTASKS, updateTask, updatePriority } from "../Redux/Task-redux/action";
import toast from "react-hot-toast";
import { Box, Flex, Text, IconButton, Avatar, Heading, Select, Input } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, BellIcon, CheckCircleIcon, DeleteIcon, EditIcon, SpinnerIcon, TimeIcon } from "@chakra-ui/icons";

function TaskItem() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "", priority: "", dueDate: "" }); // Add dueDate to state
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const tasks = useSelector((state) => state.task.tasks.data);

  useEffect(() => {
    dispatch(getTASKS());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const currentTasks = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    await dispatch(updateTask(id, { status: newStatus }));
    toast.success(newStatus ? "Task Completed" : "Task Marked Pending");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleStatusChange = (id, isCompleted) => {
    const newStatus = isCompleted ? "Completed" : "Pending";
    dispatch(updateTask(id, { status: newStatus }));
    toast.success(`Task status updated to ${newStatus}`);
  };

  const handlePriorityChange = (id, currentPriority) => {
    dispatch(updatePriority(id, currentPriority));
    toast.success(`Priority Set to ${currentPriority}`);
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleDelete = async (id) => {
    setDeletingTaskId(id);
    try {
      await dispatch(deleteTask(id));
      toast.success("Task deleted successfully");
      dispatch(getTASKS());
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred while deleting the task");
    } finally {
      setTimeout(() => setDeletingTaskId(null), 2000);
    }
  };

  const handleEditChange = (e) => setEditedTask({ ...editedTask, [e.target.name]: e.target.value });

  const submitEdit = (id) => {
    dispatch(updateTask(id, editedTask));
    setEditMode(null);
    setEditedTask({ title: "", description: "", priority: "", dueDate: "" }); // Reset dueDate after edit
    toast.success("Task edited successfully");
  };

  const toggleEditMode = (id) => {
    setEditMode(id);
    const taskToEdit = tasks.find((task) => task._id === id);
    setEditedTask({ ...taskToEdit, status: taskToEdit.status });
  };

  const getStatusColor = (status) => (status ? "green" : "yellow");
  const getStatusText = (status) => (status ? "Completed" : "Pending");

  return (
    <>
      {currentTasks.map((task, index) => (
        <Box key={index} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} bg="#EDE8F5">
          <Flex justify="space-between" alignItems="center" mb={4}>
            <Flex gap="4" alignItems="top">
              <Avatar name="Task" src={task.avatarSrc} />
              <Box>
                <Heading size="sm">{task.title}</Heading>
                <Text>{task.description}</Text>
                <Text>Due Date: {task.duedate}</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="Edit task"
              icon={<EditIcon />}
              onClick={() => toggleEditMode(task._id)}
            />
          </Flex>
          {editMode === task._id ? (
            <>
              <Box mb={4} >
                <Text>Priority:</Text>
                <Select value={editedTask.priority} onChange={(e) => handlePriorityChange(task._id, e.target.value)}>
                  <option value="urgent">Urgent</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Select>
              </Box>
              <Box mb={4}>
                <Text >Due Date:</Text>
                {/* <Input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleEditChange}
                /> */}
              </Box>
            </>
          ) : (
            <Flex justify="space-between" alignItems="center" mb={4}>
              <Text>Priority: {task.priority}</Text>
              <Flex align="center">
                <Text>Status:</Text>
                <Box
                  ml={2}
                  w={4}
                  h={4}
                  borderRadius="full"
                  bg={getStatusColor(task.status)}
                  title={getStatusText(task.status)}
                />
              </Flex>
            </Flex>
          )}
          <Flex justify="space-between" alignItems="center">
            <IconButton
              variant="ghost"
              colorScheme="green"
              aria-label="Toggle status"
              icon={task.status ? <CheckCircleIcon /> : <TimeIcon />}
              onClick={() => handleToggle(task._id, task.status)}
            />
            <IconButton
              variant="ghost"
              colorScheme="red"
              aria-label="Delete task"
              icon={deletingTaskId === task._id ? <SpinnerIcon /> : <DeleteIcon />}
              onClick={() => handleDelete(task._id)}
              disabled={deletingTaskId === task._id}
            />
            {editMode === task._id && (
              <>
                <IconButton
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Save task"
                  icon={<EditIcon />}
                  onClick={() => submitEdit(task._id)}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Cancel edit"
                  icon={<DeleteIcon />}
                  onClick={() => setEditMode(null)}
                />
              </>
            )}
          </Flex>
        </Box>
      ))}
      <Flex justify="center">
        <IconButton
          variant="ghost"
          colorScheme="blue"
          aria-label="Previous page"
          icon={<ArrowLeftIcon />}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Text fontSize="xl" fontWeight="semibold" mt={3} mx={2}>
          {currentPage}
        </Text>
        <IconButton
          variant="ghost"
          colorScheme="blue"
          aria-label="Next page"
          icon={<ArrowRightIcon />}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentTasks.length < itemsPerPage}
        />
      </Flex>
    </>
  );
}

export default TaskItem;
