
import './App.css';
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from './Page/Register';
import { Route,Routes, BrowserRouter } from "react-router-dom"
import { AppContext, useGlobalStateMgmt } from './global-state';
import './Styles/index.scss';

function App() {
  let isAuthenticated;
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const email = window.sessionStorage.getItem('sdk_email');
  const username = window.sessionStorage.getItem('sdk_username');
  const rootEl = document.getElementById('root');
  
  const stateMgmt = useGlobalStateMgmt({
    email,
    isAuthenticated,
    prefersDarkTheme,
    username,
  });

  

  return (
    <AppContext.Provider value={stateMgmt}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
