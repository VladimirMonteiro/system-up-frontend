

import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

import { AuthProvider } from './context/authProvider/AuthContext'
import Protected from './components/Protected'
import DashboardLayoutBranding from './pages/admin/Admin'
import Clientes from './pages/admin/cliente/Client'
import Ferramentas from './pages/admin/ferramentas/Ferramentas'

function App() {
  

  return (
    <div className="App">
      <AuthProvider>
        
        <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Protected><Admin/></Protected>}/>
          <Route path='/clientes' element={<Protected><DashboardLayoutBranding><Clientes/></DashboardLayoutBranding></Protected>}/>
          <Route path='/ferramentas' element={<DashboardLayoutBranding><Ferramentas/></DashboardLayoutBranding>}/>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
