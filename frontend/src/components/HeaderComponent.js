import React from 'react';
import { Typography } from '@mui/material';

const HeaderComponent = () => {
    return (
      <header style={{ textAlign: "center", padding: "5px", background: "#088F8F", color: "white" }}>
        <Typography variant="h4">ToDo Application</Typography>
        <Typography variant="subtitle1">Turn your plans into actions</Typography>
      </header>
    );
  };

export default HeaderComponent