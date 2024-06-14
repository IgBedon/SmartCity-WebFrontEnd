import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [responsavel, setResponsavel] = useState('');
    const [tipo, setTipo] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [unidade_medida, setUnidade_medida] = useState('');
    const [observacao, setObservacao] = useState('');
    const [status_operacional, setStatus_operacional] = useState('');
    const [mac_address, setMacAddress] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenStoraged = sessionStorage.getItem('token');
        if (tokenStoraged) {
            setToken(tokenStoraged);
        } else {
            console.error("Token não encontrado");
        }
    }, []);

    const criarSensor = async () => {
        if (!token) {
            console.error("Não há token para a autorização");
            return;
        }

        try {
            const response = await axios.post(
                'http://Bedon.pythonanywhere.com/api/sensores/',
                {
                    responsavel,
                    tipo,
                    mac_address,
                    localizacao,
                    latitude,
                    longitude,
                    unidade_medida,
                    observacao,
                    status_operacional
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert("Sensor criado");
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="bg-violet-800 min-h-screen">
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={(e) => { e.preventDefault(); criarSensor(); }} className="bg-slate-50 p-40 rounded-2xl">
                    <div>
                        <h1 className="text-5xl flex justify-center mb-5">Registre um novo Sensor</h1>
                    </div>

                    <div className="w-full m-auto grid grid-cols-3 gap-12 py-12">
                        <div>
                            <Input type="text" variant="underlined" label="Responsavel" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
                            <Input type="text" variant="underlined" label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                            <Input type="text" variant="underlined" label="Mac_address" value={mac_address} onChange={(e) => setMacAddress(e.target.value)} />
                        </div>

                        <div>
                            <Input type="text" variant="underlined" label="Localizacao" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
                            <Input type="text" variant="underlined" label="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                            <Input type="text" variant="underlined" label="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                        </div>

                        <div>
                            <Input type="text" variant="underlined" label="Unidade de medida" value={unidade_medida} onChange={(e) => setUnidade_medida(e.target.value)} />
                            <Input type="text" variant="underlined" label="Observacao" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
                            <Input type="text" variant="underlined" label="Status operacional" value={status_operacional} onChange={(e) => setStatus_operacional(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-2/4 m-auto py-5">
                        <Button type="submit" className="w-1/4 m-auto flex justify-center bg-violet-800 p-6 text-white">Cadastrar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
