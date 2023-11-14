import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="search" onClick={()=>{window.location='/'}}>
          <SearchIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component={Link} to="/" sx={{textDecoration:'none'}}>
          Search new company
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
