import React from 'react'
import MyRoute from './components/router/MyRoute'
import { useState } from 'react'
import { createContext } from 'react'

export let GlobalVariableContext = createContext()
const App = () => {
  let [token, setToken] = useState(localStorage.getItem("token"))
  return (
    <div>
      {/* <NavLinks></NavLinks> */}
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <MyRoute></MyRoute>
        
      </GlobalVariableContext.Provider>
    </div>
  );
}

export default App

