import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Page from './Page'

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Login/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/page' element={<Page/>} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
