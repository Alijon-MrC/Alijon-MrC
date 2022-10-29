import axios from 'axios';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Course from './pages/Course';
import Facultets from './pages/Facultets';
import Group from './pages/Group';
import Home from './pages/Home';
import Pages from './pages/Pages';
import Schedule from './pages/Schedule';
axios.defaults.baseURL = "http://localhost:3002/";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='schedule' element={<Pages />}>
        {/* <Route index element={<Outlet />} > */}
        <Route index element={<Facultets />} />
        <Route path=':facultyId' element={<Outlet />}>
          <Route index element={<Course />} />
          <Route path=':year/:semester' element={<Outlet />} >
            <Route index element={<Group />} />
            <Route path=':groupId'>
              <Route index element={<Schedule />} />
            </Route>
          </Route>
        </Route>
        {/* </Route> */}

        <Route path='course' element={<Course />} />
        <Route path='group' element={<Group />} />
        <Route path='table' element={<Schedule />} />

      </Route>
    </Routes>
  );
}

export default App;
