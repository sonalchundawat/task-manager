import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [taskDate, setTaskDate] = useState(""); // New state for date
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedText, setEditedText] = useState("");

  
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

 
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };


  const handleDateChange = (event) => {
    setTaskDate(event.target.value); 
  };

  // Handle Task Submit
  const handleTaskSubmit = () => {
    if (textInput.trim() === "" || taskDate.trim() === "") {
      return;
    }

    // Compare task date with today's date
    const currentDate = new Date();
    const newTaskDate = new Date(taskDate);

    // Calculate the difference in days
    const timeDiff = newTaskDate - currentDate;
    const dayDiff = timeDiff / (1000 * 3600 * 24); // Convert time diff to days

    // Determine priority based on date difference
    let priority = "Low"; // Default is Low
    if (dayDiff <= 5) {
      priority = "High";
    } else if (dayDiff <= 15) {
      priority = "Medium";
    }

    const newTask = {
      text: textInput,
      priority: priority,
      date: taskDate, // Adding date to the task object
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTextInput("");
    setTaskDate(""); // Clear the date input after adding the task
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditedText(task.text);
  };

  const handleSaveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
    setEditedText("");
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    if (priority === "High") {
      return "bg-red-600"; // Dark Red for High Priority
    } else if (priority === "Medium") {
      return "bg-yellow-600"; // Dark Yellow for Medium Priority
    } else {
      return "bg-green-600"; // Dark Green for Low Priority
    }
  };

  return (
    <div className="p-8">
      {/* Input Section */}
      <div className="flex justify-center gap-4 items-center font-main">
        <div className="w-full lg:w-96">
          <input
            type="text"
            value={textInput}
            onChange={handleTextInputChange}
            className="w-full border rounded p-2"
            placeholder="Enter task"
          />
        </div>
        <div className="w-full lg:w-96">
          <input
            type="date"
            value={taskDate}
            onChange={handleDateChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Add Task
        </button>
      </div>

      {/* Displaying Tasks in Separate Boxes for Each Priority */}
      <div className="mt-8 space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* High Priority Box */}
          <div className="p-4 border rounded-lg">
            <div
              className={`p-4 text-black text-center font-bold rounded-lg ${getPriorityColor(
                "High"
              )}`}
            >
              High Priority
            </div>
            <div className="mt-4">
              {getTasksByPriority("High").map((task, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 border-dashed rounded-lg ${getPriorityColor(
                    task.priority
                  )} mb-4`}
                >
                  {selectedTask === task ? (
                    <>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                      />
                      <button
                        onClick={handleSaveEditedTask}
                        className="bg-green-500 text-white p-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setSelectedTask(null)}
                        className="ml-2 bg-gray-500 text-white p-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{task.text}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Date: {task.date}</p> {/* Display the task date */}
                      <div className="flex justify-end gap-2">
                        <FaEdit
                          onClick={() => handleEditTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => handleDeleteTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Medium Priority Box */}
          <div className="p-4 border rounded-lg">
            <div
              className={`p-4 text-black text-center font-bold rounded-lg ${getPriorityColor(
                "Medium"
              )}`}
            >
              Medium Priority
            </div>
            <div className="mt-4">
              {getTasksByPriority("Medium").map((task, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 border-dashed rounded-lg ${getPriorityColor(
                    task.priority
                  )} mb-4`}
                >
                  {selectedTask === task ? (
                    <>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                      />
                      <button
                        onClick={handleSaveEditedTask}
                        className="bg-green-500 text-white p-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setSelectedTask(null)}
                        className="ml-2 bg-gray-500 text-white p-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{task.text}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Date: {task.date}</p> {/* Display the task date */}
                      <div className="flex justify-end gap-2">
                        <FaEdit
                          onClick={() => handleEditTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => handleDeleteTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Low Priority Box */}
          <div className="p-4 border rounded-lg">
            <div
              className={`p-4 text-black text-center font-bold rounded-lg ${getPriorityColor(
                "Low"
              )}`}
            >
              Low Priority
            </div>
            <div className="mt-4">
              {getTasksByPriority("Low").map((task, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 border-dashed rounded-lg ${getPriorityColor(
                    task.priority
                  )} mb-4`}
                >
                  {selectedTask === task ? (
                    <>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="w-full border rounded p-2 mb-2"
                      />
                      <button
                        onClick={handleSaveEditedTask}
                        className="bg-green-500 text-white p-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setSelectedTask(null)}
                        className="ml-2 bg-gray-500 text-white p-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{task.text}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Date: {task.date}</p> {/* Display the task date */}
                      <div className="flex justify-end gap-2">
                        <FaEdit
                          onClick={() => handleEditTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                        <FaTrash
                          onClick={() => handleDeleteTask(task)}
                          className="text-black-500 cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;