// eslint-disable-next-line react/prop-types
export default function WeatherCard({city,temp, wind, humidity, icon}) {

    return (
        <div className="flex w-full justify-center pt-12">
            <div className="bg-gray-200 p-10 w-[400px] rounded-2xl">
                <h1 className="text-3xl font-bold uppercase text-center">{city}</h1>
                <div className="flex items-center flex-col pt-3">                    
                    <h1 className="text-[70px] font-bold leading-none">{temp}°C</h1>                    
                    <img className="w-32" src={icon} alt="" />
                    <div className="bg-gray-300 flex gap-3 items-center p-5">
                        <div className="flex flex-col items-center ">
                            <h1 className="text-center">Wind</h1>
                            <h1 className="font-bold">{wind} m/s</h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-center">Humitidy</h1>
                            <h1 className="font-bold">{humidity} %</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}