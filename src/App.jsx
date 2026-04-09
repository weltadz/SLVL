import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <Home/>
        </ProtectedRoutes>
      }
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App
