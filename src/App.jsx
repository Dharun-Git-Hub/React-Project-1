import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import MainMenu from './components/MainMenu/MainMenu'
import TextEditor from './components/TextEditor/TextEditor'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<MainMenu/>} />
      <Route path="/main" element={ <> <Sidebar /><Main /> </> } />
      <Route path="/text-editor" element={<TextEditor />} />
     </Routes>
     </Router>
    )
}

export default App