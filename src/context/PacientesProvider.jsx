import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'

const PacienteContext = createContext()

export const PacienteProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')

                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)
            } catch (error) {
                console.error(error)
            }
        }

        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.error(error.response.data)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.error(error.response.data)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Estas seguro que deseas eliminar este registro?')

        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.error(error.response.data)
            }
        }
    }

    return (
        <PacienteContext.Provider value={{
            guardarPaciente,
            setEdicion,
            eliminarPaciente,
            pacientes,
            paciente
        }}>
            {children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext