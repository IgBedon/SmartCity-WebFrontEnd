import { Button, Input } from "@nextui-org/react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', token)
        }
    }, [token]);

    const createUser = async () => {
        try {
            const response = await axios.post('http://Bedon.pythonanywhere.com/api/create_user/',
                {
                    username,
                    email,
                    password
                });

            const resp = await axios.post('http://Bedon.pythonanywhere.com/api/token/',
                {
                    username,
                    password
                })
            setToken(resp.data.access)
            navigate("/home")
        }
        catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="flex bg-violet-800 min-h-screen items-center justify-center">
            <div className="flex items-center justify-center bg-slate-50 w-2/6 py-10 mt-12">
                <form action="">
                    <div className="">
                        <h1 className="text-5xl flex justify-center mb-5">Crie sua conta!</h1>
                        <p className="text-xl flex justify-center w-3/5 m-auto text-center text-gray-500">Insira as informações solicitadas abaixo para a criação da sua conta.</p>
                    </div>

                    <div className="w-2/4 m-auto grid gap-12 py-12">
                        <Input type="text" variant="underlined" label="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="email" variant="underlined" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" variant="underlined" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="w-2/4 m-auto py-5">
                        <Button type="button" className="w-1/4 m-auto flex justify-center bg-violet-800 text-slate-50" onClick={() => createUser()}>Cadastrar</Button>

                        <div className="flex justify-center m-auto mt-5">
                            <span className="text-gray-500">Já possui conta?</span>
                            <Link to="/login" className="text-violet-800 ml-1">Clique aqui</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}