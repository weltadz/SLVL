import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Request from  "./pages/Request"
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

      <Route path="/employee/request" 
      element={
        <ProtectedRoutes allowedRoles = {["Employee"]}>
          <EmployeeLayout>
            <Request/>
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
            <Home/>
          </ManagerLayout>
        </ProtectedRoutes>
      }
      />

    </Routes>
    </BrowserRouter>
  )
}

export default App
