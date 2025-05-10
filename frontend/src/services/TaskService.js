import axios from 'axios';

const API_URL = "http://localhost:8080/api/tasks";

const TaskService = {

  // get most recent tasks
  getReccentTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/recent`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //add new task
  addTask: async (task) => {
    try {
      const response = await axios.post(`${API_URL}/add`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // update task status
  updateTaskStatus: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/status`, 
        true,
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
       );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TaskService;