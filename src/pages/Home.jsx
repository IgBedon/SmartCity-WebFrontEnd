import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Painel from "../components/Painel";
import PainelMap from "../components/PainelMap";
import Footer from "../components/Footer";
import axios from "axios";
import { Button } from "@nextui-org/react";

export default function Home() {
    const [token, setToken] = useState('');
    const [sensores, setSensores] = useState([]);
    const [escolha, setEscolha] = useState('');
    const [sensor, setSensor] = useState('');
    const [sensorData, setSensorData] = useState('');
    const [selectedButton, setSelectedButton] = useState('');

    useEffect(() => {
        const tokenStoraged = sessionStorage.getItem('token');
        if (tokenStoraged) {
            setToken(tokenStoraged);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getSensores();
        }
    }, [token, escolha]);

    const getSensores = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/sensores/?tipo=${escolha}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSensores(response.data);
        } catch (error) {
            console.error("Failed to fetch sensores:", error);
        }
    };

    const handleEscolhaChange = (novaEscolha) => {
        setEscolha(novaEscolha);
        setSelectedButton(novaEscolha);
    };

    const handleSensorChange = async (sensor) => {
        setSensor(sensor);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/${sensor.tipo.toLowerCase()}_filter/`, {
                'sensor_id': sensor.id
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            setSensorData(response.data);
        } catch (error) {
            console.error("Failed to fetch sensor data:", error);
        }
    };

    return (
        <>
            <section className="h-screen">
                <section className="h-4/6">
                    <div className="flex flex-col h-full">
                        <div className="flex flex-1 overflow-hidden items-center mt-12 pt-3 bg-violet-800">
                            <div className="bg-violet-800 w-1/4 p-4">
                                <Menu onEscolhaChange={handleEscolhaChange} selectedButton={selectedButton} />
                            </div>
                            <div className="flex-1 p-4 overflow-auto">
                                <PainelMap sensores={sensores} onClickMarker={handleSensorChange} />
                            </div>
                            <div className="bg-violet-800 w-1/4 p-4">
                                <Painel sensor={sensor} sensorData={sensorData} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="h-2/6">
                    <div className="grid grid-cols-2 pt-20 pl-20 h-full">
                        <div className="flex items-center justify-center">
                            <div className="w-3/4">
                                <h1 className="text-violet-900 text-3xl mb-5">SmartCity Roberto Mange Mobile App</h1>
                                <p>Em breve, haverá um versão deste serviço em formato de aplicativo, visando atender a demanda para Android e IOS.</p>
                                <p className="mb-8">Fique atento para as próximas novidades do nosso serviço!</p>

                                <Button className="bg-violet-800 text-white w-40">Em breve</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <Footer />
        </>
    );
}
