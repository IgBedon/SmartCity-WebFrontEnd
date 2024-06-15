import PainelElement from "./PainelElement";
import { useEffect, useState } from "react";

function formatDate(dateString) {
    const date = new Date(dateString);

    // Obtenha a data e hora usando métodos UTC
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Formate a data e hora no padrão brasileiro
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function getMeasureUnit(sensorType) {
    switch (sensorType) {
        case "Temperatura":
            return "°C";
        case "Umidade":
            return "%";
        case "Luminosidade":
            return "LUX";
        default:
            return "";
    }
}

export default function Painel({ sensor, sensorData }) {
    const [lastSensorData, setLastSensorData] = useState(null);

    useEffect(() => {
        if (sensorData.length > 0) {
            const lastData = sensorData[sensorData.length - 1];
            setLastSensorData(lastData);
        } else if (sensorData.results && sensorData.results.length > 0) {
            const lastData = sensorData.results[sensorData.results.length - 1];
            setLastSensorData(lastData);
        }
    }, [sensorData]);

    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="grid grid-cols-2 gap-4">
                <PainelElement
                    information="Tipo"
                    measure={sensor.tipo}
                    title="Tipo do sensor"
                    subtitle="Tipo do sensor que está sendo exibido."
                />
                <PainelElement
                    information="Localização"
                    measure={sensor.localizacao}
                    title="Localização do Sensor"
                    subtitle="Local em que o sensor se encontra."
                />

                {lastSensorData && (
                    <>
                        {sensor.tipo === "Contador" ? (
                            <>
                                <PainelElement
                                    information="Contagem"
                                    measure={sensorData.count}
                                    title="Contagem capturada pelo sensor"
                                    subtitle="Contagem capturada pelo sensor em exibição."
                                />
                                <PainelElement
                                    information="Data"
                                    measure={formatDate(lastSensorData.timestamp)}
                                    title="Data da contagem do valor"
                                    subtitle="Data da contagem do valor que está sendo exibido."
                                />
                            </>
                        ) : (
                            <>
                                <PainelElement
                                    information="Valor"
                                    measure={`${lastSensorData.valor} ${getMeasureUnit(sensor.tipo)}`}
                                    title="Valor capturado pelo sensor"
                                    subtitle="Valor capturado pelo sensor em exibição."
                                />
                                <PainelElement
                                    information="Data"
                                    measure={formatDate(lastSensorData.timestamp)}
                                    title="Data da captura do valor"
                                    subtitle="Data da captura do valor que está sendo exibido."
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
