import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from "./pages/Admin"
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" 
      element={
        <ProtectedRoutes allowedRoles = {["HR","Supervisor","Manager"]}>
          <Home/>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin" 
      element={
        <ProtectedRoutes allowedRoles={["Admin"]}>
          <Admin/>
        </ProtectedRoutes>
      }
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App
