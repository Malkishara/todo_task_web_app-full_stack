import React,{useState,useEffect} from 'react';
import { Box,Grid } from '@mui/material';
import TaskService from '../services/TaskService';
import HeaderComponent from '../components/HeaderComponent';
import AddTaskComponent from '../components/AddTaskComponent';
import ViewTasksComponent from '../components/ViewTasksComponent';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // fetch most recent tasks
  const fetchTasks = async () => {
    const data = await TaskService.getReccentTasks();
    console.log("data: ",data);
    setTasks(data);
  };

  

  return (
    <Box sx={{ backgroundColor: '#CCCCFF',minHeight:'620px' }}>
      {/* header */}
    <HeaderComponent />
    <Grid container spacing={2} style={{ margin: "20px" }}>
      <Grid size={{ xs: 12, md: 6 }}>
        {/* add task component */}
        <AddTaskComponent refreshTasks={fetchTasks} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {/* view task component */}
        <ViewTasksComponent tasks={tasks} refreshTasks={fetchTasks} />
      </Grid>
    </Grid>
  </Box>
  )
}

export default HomePage