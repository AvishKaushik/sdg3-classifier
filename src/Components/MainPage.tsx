// src/App.js
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import ResponsiveAppBar from './ResponsiveAppBar'; // Assuming you have the nav bar as well
import SdgForm from './SdgForm';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ResponsiveAppBar onPageChange={handlePageChange} />
      <div style={{ padding: '20px' , height:'100vh'}}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'sdgform' && <SdgForm />}
      </div>
    </div>
  );
};

export default App;
