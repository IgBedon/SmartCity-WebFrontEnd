import { Button } from "@nextui-org/react"

export default function Menu({ onEscolhaChange, selectedButton }) {
    const getButtonClass = (buttonType) => {
        return selectedButton === buttonType 
            ? "w-full p-10 text-2xl border border-white text-violet-800 font-bold bg-white" 
            : "w-full p-10 text-2xl border border-white text-white bg-transparent";
    };

    return (
        <div className="h-full p-4 flex flex-col justify-center">
            <div className="w-full space-y-4">
                <Button
                    className={getButtonClass('')}
                    onClick={() => onEscolhaChange("")}
                >
                    Geral
                </Button>
                <Button
                    className={getButtonClass('Temperatura')}
                    onClick={() => onEscolhaChange('Temperatura')}
                >
                    Temperatura
                </Button>
                <Button
                    className={getButtonClass('Umidade')}
                    onClick={() => onEscolhaChange('Umidade')}
                >
                    Umidade
                </Button>
                <Button
                    className={getButtonClass('Luminosidade')}
                    onClick={() => onEscolhaChange('Luminosidade')}
                >
                    Luminosidade
                </Button>
                <Button
                    className={getButtonClass('Contador')}
                    onClick={() => onEscolhaChange('Contador')}
                >
                    Contador
                </Button>
            </div>
        </div>
    );
}