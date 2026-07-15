import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout, NotFound } from "./components";
import {
  Budgets,
  Categories,
  Dashboard,
  Expenses,
  Landing,
  Register,
} from "./pages";
import Login from "./pages/Login";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right"/>
      <Routes>
        {/* gutest routes */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Landing />} />
        </Route>

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="categories" element={<Categories />} />
            <Route path="budgets" element={<Budgets />} />
          </Route>
        </Route>
  
        {/* 404 page */}
        <Route path="*" element={<NotFound />}/>
        
      </Routes>
    </>
  );
}

export default App;
