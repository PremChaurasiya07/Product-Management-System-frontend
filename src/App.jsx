
import { Route,Routes,Router } from 'react-router-dom'
import Update from './components/Update'
import Delete from './components/Delete'
import Create from './components/Create'
import Home from './components/Home'
import Info from './components/Info'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthProvider } from './contextApi/Authcontext'
function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path={'/'} element={<Login/>}/>
      <Route path={'/register'} element={<Register/>}/>
      <Route path={'/home/:id'} element={<Home/>}/>
      <Route path={'/info/:id'} element={<Info/>}/>
      <Route path={'/edit/:id'} element={<Update/>}/>
      <Route path={'/delete/:id'} element={<Delete/>}/>
      <Route path={'/create'} element={<Create/>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
