import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import {BrowserRouter} from 'react-router-dom';
import AddEditTask from "./pages/AddEditTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper/>}>
            <Route index element={<Home />} />
            <Route path="/task" element={<AddEditTask />} />
            <Route path="/task/:id" element={<AddEditTask />} />
          </Route>
          <Route path="*" element={<h1>Page 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      
    {/* <Home /> */}
    </div>
    
  );

  // return (
  //   <Routes>
  //     <Route path="/" element={<Wrapper />}>
  //       <Route index element={<Home />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/detail/:id" element={<Detail />} />
  //     </Route>
  //     <Route path="*" element={<h1>Page 404 Not Found</h1>} />
  //   </Routes>
  // );
}

export default App;
