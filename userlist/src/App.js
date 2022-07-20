import React from 'react';

import AddUser from './components/Users/AddUser.js';
import UsersList from './components/Users/UsersList.js';


function App() {
  return (
    <div>
      <AddUser/>
      <UsersList users={[]}/>
    </div>
  );
}

export default App;
