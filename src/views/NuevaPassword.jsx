import React from 'react'
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevaPassword = () => {
	const [password, setPassword] = React.useState("");
	const [alerta, setAlerta] = React.useState({})
	const [tokenValido, setTokenValido] = React.useState(false)
	const [passwordModificado, setPasswordModificado] = React.useState(false)

	const params = useParams()
	const { token } = params

	React.useEffect(() => {
		const comprobarToken = async () => {

			try {
				await clienteAxios(`/veterinarios/olvide-password/${token}`)
				setAlerta({
					msg: 'Coloca tu nuevo password'
				})
				setTokenValido(true)
			} catch (error) {
				setAlerta({
					msg: 'Hubo un error con el enlace',
					error: true
				})
			}
		}

		comprobarToken()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe tener minimo 6 caracteres',
				error: true
			})
			return
		}

		try {
			const url = `/veterinarios/olvide-password/${token}`
			const { data } = await clienteAxios.post(url, { password })
			setAlerta({
				msg: data.msg
			})
			setPasswordModificado(true)
		} catch (error) {
			setAlerta({
				msg: error.response.data.error,
				error: true
			})
		}
	}

	const { msg } = alerta

	return (
		<>
			<div>
				<h1 className='text-indigo-600 font-black text-6xl'>Reestable tu password y no pierdas acceso a tus <span className='text-black'>pacientes</span></h1>
			</div>

			<div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

				{msg && <Alerta alerta={alerta} />}

				{tokenValido && (
					<>
						<form onSubmit={handleSubmit}>
							<div className='my-5'>
								<label htmlFor=""
									className='uppercase text-gray-600 block text-xl font-bold'
								>
									Nuevo Password
								</label>
								<input type="password"
									placeholder='Tu password'
									className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>

							<input type="submit"
								value="Guardar nuevo password"
								className='bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
							/>
						</form>
					</>
				)}

				{passwordModificado && <Link to="/" className='block text-center my-5 text-gray-500'>Inicia sesion</Link>}
			</div>
		</>
	)
}

export default NuevaPassword