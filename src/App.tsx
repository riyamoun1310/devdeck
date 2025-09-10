import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <Dashboard currentTheme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
