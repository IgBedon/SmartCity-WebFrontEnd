import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function EditSensor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [responsavel, setResponsavel] = useState('')
    const [tipo, setTipo] = useState('')
    const [mac_address, setMacAddress] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [unidade_medida, setUnidade_medida] = useState('')
    const [observacao, setObservacao] = useState('')
    const [status_operacional, setStatus_operacional] = useState('')

    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenStoraged = sessionStorage.getItem('token');
        if (tokenStoraged) {
            setToken(tokenStoraged);
            fetchSensorData(tokenStoraged);
        } else {
            console.error("Token não encontrado");
        }
    }, []);

    const fetchSensorData = async (token) => {
        try {
            const response = await axios.get(`http://Bedon.pythonanywhere.com/api/sensores/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setResponsavel(response.data.responsavel)
            setTipo(response.data.tipo)
            setMacAddress(response.data.mac_address)
            setLocalizacao(response.data.localizacao)
            setLatitude(response.data.latitude)
            setLongitude(response.data.longitude)
            setUnidade_medida(response.data.unidade_medida)
            setObservacao(response.data.observacao)
            setStatus_operacional(response.data.status_operacional)
        } catch (error) {
            console.error("Failed to fetch sensor data:", error);
        }
    };

    const handleFormSubmit = async () => {
        try {
            await axios.put(`http://Bedon.pythonanywhere.com/api/sensores/${id}/`, {
                responsavel,
                tipo,
                mac_address,
                localizacao,
                latitude,
                longitude,
                unidade_medida,
                observacao,
                
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Sensor atualizado!')
            navigate("/sensors");
        } catch (error) {
            console.error("Failed to update sensor:", error);
        }
    };

    return (
        <>
            <div className="bg-violet-800 min-h-screen">
                <div className="flex items-center justify-center h-screen">
                    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="bg-slate-50 p-40 rounded-2xl">
                        <div>
                            <h1 className="text-5xl flex justify-center mb-5">Atualize o Sensor {id}</h1>
                        </div>

                        <div className="w-full m-auto grid grid-cols-3 gap-12 py-12">
                            <div>
                                <Input type="text" variant="underlined" label="Responsavel" value={responsavel} defaultValue="" onChange={(e) => setResponsavel(e.target.value)} />
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
                            <Button type="submit" className="w-1/4 m-auto flex justify-center bg-violet-800 text-white p-6">Atualizar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}