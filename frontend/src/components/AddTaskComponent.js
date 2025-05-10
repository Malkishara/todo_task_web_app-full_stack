import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskService from '../services/TaskService';

const AddTaskComponent = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //handle add task
  const handleAddTask = async () => {
    
    setError("");
    setSuccess("");

    //check title and description are null or not
    if (!title.trim() || !description.trim()) {
      setError("Both Title and Description are required.");
      return;
    }

    try {
      await TaskService.addTask({ title, description });
      setTitle("");
      setDescription("");
      setSuccess("Task added successfully! ");
      refreshTasks();
    } catch (error) {
      setError("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    }
  };

  return (
    <Card>
      <CardContent style={{  background: "#A7C7E7", color: "black" }}>
        <Typography variant="h6">
  <AddCircleIcon style={{ fontSize: 40 }}/>
  <br/>
  Add Task 
        </Typography>

       {error && (
  <Alert data-testid="error-alert" severity="error" sx={{ backgroundColor: '#A7C7E7' }}>
    {error}
  </Alert>
)}

{success && (
  <Alert data-testid="success-alert" severity="success" sx={{ backgroundColor: '#A7C7E7' }}>
    {success}
  </Alert>
)}


        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
           inputProps={{ 'data-testid': 'title-input' }}
          margin="normal"
          error={!title.trim() && error} 
          helperText={!title.trim() && error ? "Title is required" : ""}
         sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  }}
        />
        
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ 'data-testid': 'description-input' }}
          margin="normal"
          error={!description.trim() && error} 
          helperText={!description.trim() && error ? "Description is required" : ""}
        sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  }}
       />

        <Button variant="contained" color="success" onClick={handleAddTask} fullWidth>
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddTaskComponent;