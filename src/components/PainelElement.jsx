import { Popover, PopoverTrigger, PopoverContent, Card } from "@nextui-org/react";

export default function PainelElement(props) {
    return (
        <Popover
            className="w-36"
            showArrow
            offset={10}
            placement="bottom"
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        duration: 0.1,
                        transition: {
                            opacity: {
                                duration: 0.15,
                            },
                        },
                    },
                    exit: {
                        y: "10%",
                        opacity: 0,
                        duration: 0,
                        transition: {
                            opacity: {
                                duration: 0.1,
                            },
                        },
                    },
                },
            }}
        >
            <PopoverTrigger>
                <Card isPressable className="w-40 h-32 bg-transparent shadow-none p-2">
                    <div className="text-left text-2xl font-medium text-white mb-1">{props.information}</div>
                    <h1 className="text-left text-xl text-white mb-2">{props.measure}</h1>
                </Card>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-2 py-2">
                    <div className="font-medium mb-1">{props.title}</div>
                    <div className="text-xs">{props.subtitle}</div>
                </div>
            </PopoverContent>
        </Popover>
    );
}