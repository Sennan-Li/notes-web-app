import './scss/App.scss';
import Header from './components/header';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import React, {useState}from 'react';
import Note from './pages/note'
import Others from './components/others';



function App() {
  const [others, setOthers] = useState(false)
  function handleOpenOthers() {
    others===false?setOthers(true):setOthers(false)
  }
  function handleCloseOthers() {
    setOthers(false)
  }
  return (
    <section>
     <Header onOpenOthers={handleOpenOthers} onCloseOthers={handleCloseOthers}/>
      {others&&<Others/>}
      <div className="app">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/notes" />} />
            <Route path='/notes/:id?' element={<Note onCloseOthers={handleCloseOthers}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}

export default App;
