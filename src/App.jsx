import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Employee/Home'
import Admin from "./pages/Admin/Admin"
import HR from "./pages/HR/HR"
import Supervisor from "./pages/Supervisor/Supervisor"
import Manager from "./pages/Manager/Manager"
import ProtectedRoutes from './components/ProtectedRoutes'
import EmployeeLayout from "./components/EmployeeLayout"
import AdminLayout from "./components/AdminLayout"
import HRLayout from "./components/HRLayout"
import SupervisorLayout from "./components/SupervisorLayout"
import ManagerLayout from "./components/ManagerLayout"

function App() {
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login/>}/>

      <Route path="/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Employee"]}>
          <EmployeeLayout>
            <Home/>
          </EmployeeLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <Admin/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/hr" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <HR/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/supervisor" 
      element={
        <ProtectedRoutes allowedRoles = {["Supervisor"]}>
          <SupervisorLayout>
            <Supervisor/>
          </SupervisorLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/manager" 
      element={
        <ProtectedRoutes allowedRoles = {["Manager"]}>
          <ManagerLayout>
            <Manager/>
          </ManagerLayout>
        </ProtectedRoutes>
      }
      />

    </Routes>
    </BrowserRouter>
  )
}

export default App
