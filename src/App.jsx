import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './views/Login';
import Registrar from './views/Registrar';
import OlvidePassword from './views/OlvidePassword';
import ConfirmarCuenta from './views/ConfirmarCuenta';
import NuevaPassword from './views/NuevaPassword';
import AdministrarPaciente from './views/AdministrarPaciente';
import EditarPerfil from './views/EditarPerfil';
import CambiarPassword from './views/CambiarPassword';

import {AuthProvider} from './context/AuthProvider'
import {PacienteProvider} from './context/PacientesProvider'

function App() {

  return (
    <BrowserRouter>
		<AuthProvider>
			<PacienteProvider>
				<Routes>
					<Route path="/" element={<AuthLayout/>} >
						<Route index element={<Login/>} />
						<Route path="registrar" element={<Registrar/>} />
						<Route path="confirmar/:id" element={<ConfirmarCuenta/>} />
						<Route path="olvide-password" element={<OlvidePassword/>} />
						<Route path="olvide-password/:token" element={<NuevaPassword/>} />
					</Route>

					<Route path='/admin' element={<RutaProtegida/>} >
						<Route index element={<AdministrarPaciente/>} />
						<Route path='perfil' element={<EditarPerfil/>} />
						<Route path='cambiar-password' element={<CambiarPassword/>} />
					</Route>
				</Routes>
			</PacienteProvider>
		</AuthProvider>
    </BrowserRouter>
  )
}

export default App
