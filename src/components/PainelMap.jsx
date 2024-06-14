"use client"

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps"

export default function PainelMap({ sensores, onClickMarker }) {
    const position = { lat: -22.914124605604947, lng: -47.068326004158656 }

    return (
        <>
            <div className='h-[32rem] w-full'>
                <APIProvider apiKey="AIzaSyC9IOLAvHYrb_7Fll1mEhGpD3aL2PmR29Y">
                    <div className="h-[32rem]">
                        <Map mapId="974a35a4e2e2df61" defaultZoom={20} defaultCenter={position} mapTypeControl={false} zoomControl={false}>
                            {sensores.map((sensor) => (
                                <AdvancedMarker key={sensor.id} position={{ lat: sensor.latitude, lng: sensor.longitude }} onClick={() => onClickMarker(sensor)}>
                                    <Pin />
                                </AdvancedMarker>
                            ))}
                            <AdvancedMarker position={position} >
                                <img src={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'} width={32} height={32} />
                            </AdvancedMarker>
                        </Map>
                    </div>
                </APIProvider>

            </div>

        </>
    )
}