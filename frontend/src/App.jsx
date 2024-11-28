import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import ManageUsers from "./components/ManageUsers";
import ChangePassword from "./components/ChangePassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/manage-users" element={<ManageUsers/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
