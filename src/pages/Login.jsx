import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { Input } from "@nextui-org/react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const fetchToken = async () => {
        if (username && password) {
            try {
                const response = await axios.post(
                    'http://Bedon.pythonanywhere.com/api/token/',
                    {
                        username,
                        password
                    }
                )
                sessionStorage.setItem('token', response.data.access)
                sessionStorage.setItem('token_refresh', response.data.refresh)
                navigate("/home")
            } catch (error) {
                console.error("Failed to fetch token:", error)
            }
        } else {
            alert("Por favor, insira o nome de usuário e a senha")
        }
    }

    return (
        <div className="flex bg-violet-800 min-h-screen items-center justify-center">
            <div className="flex items-center justify-center bg-slate-50 w-2/6 py-12 rounded-2xl">
                <form onSubmit={(e) => { e.preventDefault(); fetchToken(); }}>
                    <div className="">
                        <h1 className="text-5xl flex justify-center mb-5">Entre em sua conta!</h1>
                        <p className="text-xl flex justify-center w-3/5 m-auto text-center text-gray-500">Seja bem-vindo! Entre com sua conta para ter acesso a SmartCity.</p>
                    </div>

                    <div className="w-2/4 m-auto grid gap-12 py-12">
                        <Input type="text" variant="underlined" label="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="password" variant="underlined" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="w-2/4 m-auto py-5">
                        <Button type="submit" className="w-1/4 m-auto flex justify-center bg-violet-700 text-slate-50">Entrar</Button>

                        <div className="flex justify-center m-auto mt-5">
                            <span className="text-gray-500">Não possui conta?</span>
                            <Link to="/signup" className="text-violet-800 ml-1">Clique aqui</Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
