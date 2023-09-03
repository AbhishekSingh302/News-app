
import './App.css';

import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = ()=>{

  const apiKey= process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country={'us'} category='general'/>}></Route>
          <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={9} country={'in'} category='business'/>}></Route>
          <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={9} country={'in'} category='entertainment'/>}></Route>
          <Route path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={9} country={'in'} category='general'/>}></Route>
          <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={9} country={'in'} category='health'/>}></Route>
          <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={9} country={'in'} category='science'/>}></Route>
          <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={9} country={'in'} category='sports'/>}></Route>
          <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={9} country={'in'} category='technology'/>}></Route>
        </Routes>
        </Router>
      </div>
    )
}

export default App;
