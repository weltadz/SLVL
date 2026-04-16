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

      <Route path="/employee/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Employee"]}>
          <EmployeeLayout>
            <Home/>
          </EmployeeLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <Home/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/hr/home" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <Home/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/supervisor/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Supervisor"]}>
          <SupervisorLayout>
            <Home/>
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
