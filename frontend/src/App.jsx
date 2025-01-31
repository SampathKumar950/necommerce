import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { Header, PageNotFound } from './components';
import { Home } from './pages';

import './App.css'


function App() {

  return (

    <main className=''>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'*'} element={<PageNotFound />} />
    
        </Routes>

      </BrowserRouter>
    </main>
  )
}

export default App
