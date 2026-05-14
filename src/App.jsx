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
import ApprovalHr from "./pages/HR/ApprovalHr"
import ApprovalSupervisor from "./pages/Supervisor/ApprovalSupervisor"
import ApprovalManager from "./pages/Manager/ApprovalManager"
import ApprovalAdmin from "./pages/Admin/ApprovalAdmin"
import Users from "./pages/Admin/AdminUsersPage"
import Employees from "./pages/HR/HrEmployeePage"
import Settings from "./pages/Admin/SettingsAdmin"

function App() {
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login/>}/>

      {/* employee route */}
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

      {/* admin route */}
      <Route path="/admin/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <Home/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin/approvals" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <ApprovalAdmin/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin/users" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <Users/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/admin/settings" 
      element={
        <ProtectedRoutes allowedRoles = {["Admin"]}>
          <AdminLayout>
            <Settings/>
          </AdminLayout>
        </ProtectedRoutes>
      }
      />

      {/* hr route */}
      <Route path="/hr/home" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <Home/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/hr/request" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <Request/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/hr/approvals" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <ApprovalHr/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/hr/employees" 
      element={
        <ProtectedRoutes allowedRoles = {["HR"]}>
          <HRLayout>
            <Employees/>
          </HRLayout>
        </ProtectedRoutes>
      }
      />

      {/* supervisor route */}
      <Route path="/supervisor/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Supervisor"]}>
          <SupervisorLayout>
            <Home/>
          </SupervisorLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/supervisor/request" 
      element={
        <ProtectedRoutes allowedRoles = {["Supervisor"]}>
          <SupervisorLayout>
            <Request/>
          </SupervisorLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/supervisor/approvals" 
      element={
        <ProtectedRoutes allowedRoles = {["Supervisor"]}>
          <SupervisorLayout>
            <ApprovalSupervisor/>
          </SupervisorLayout>
        </ProtectedRoutes>
      }
      />

     
      {/* manager route */}
      <Route path="/manager/home" 
      element={
        <ProtectedRoutes allowedRoles = {["Manager"]}>
          <ManagerLayout>
            <Home/>
          </ManagerLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/manager/request" 
      element={
        <ProtectedRoutes allowedRoles = {["Manager"]}>
          <ManagerLayout>
            <Request/>
          </ManagerLayout>
        </ProtectedRoutes>
      }
      />

      <Route path="/manager/approvals" 
      element={
        <ProtectedRoutes allowedRoles = {["Manager"]}>
          <ManagerLayout>
            <ApprovalManager/>
          </ManagerLayout>
        </ProtectedRoutes>
      }
      />

    </Routes>
    </BrowserRouter>
  )
}

export default App
