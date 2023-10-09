import { useState } from 'react';
import './App.css'
import toast, {Toaster} from 'react-hot-toast';
import WeatherCard from './components/WeatherCard';

function App() {

  const [infoWeather, setInfoWeather] = useState('');
  const [infoCity, setInfoCity ] = useState('');
  const [infoCC, setInfoCC ] = useState('');

  const handleInput = (e) => {
    setInfoCity(e.target.value);
  }
  const handleSelectChange = (e) => {
    if(e.target.value !== ''){
      setInfoCC(e.target.value);
    }
    
    console.log(infoCC);
  };


  async function getWeather(e) {
    
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${infoCity},${infoCC}&lang=sp,es&appid=4c49766534b347f4a8eb6ef5c09de1f3`

    if (infoCity === '' && infoCC === '') {
      toast.error('Error, ingresa todos los datos.', {
        position: 'bottom-center',
        style: {
          padding: '20px',
          fontWeight: '700',
        }
      });
      return
    } else if (infoCity === '') {
      toast.error('Error, ingresa una ciudad.', {
        position: 'bottom-center',
        style: {
          padding: '20px',
          fontWeight: '700',
        }
      });
      return
    } else if (infoCC === '') {
      toast.error('Error, ingresa un país.', {
        position: 'bottom-center',
        style: {
          padding: '20px',
          fontWeight: '700',
        }
      });
      return
    }

    try {
      const res = await fetch(url);
      if(!res.ok) {
        toast.error('Error, esa ciudad no existe.', {
          position: 'bottom-center',
          style: {
            padding: '20px',
            fontWeight: '700',
          }
        });
        return
      }
      const data = await res.json();
      console.log(data);
      setInfoWeather(data);
      if(infoCity !== infoWeather.name){
        toast.success('Mostrando informacion...', {
          position: 'bottom-center',
          style: {
            padding: '20px',
            fontWeight: '700',
          }
        });
      } else {
        toast('Ya tienes los datos en pantalla!', {
          icon: '⚠️',
          position: 'bottom-center',
          style: {
            padding: '20px',
            fontWeight: '700',
          }
          
        })
      }
    
    }
    catch (err) { 
      console.error('Error:', err);
      
    }
  }
  

  return (
    <>
      <div className='flex justify-center border bg-gray-200'>
        <form className='resDes flex gap-5 justify-center items-center p-3' action="">
          <input placeholder='Ingresa tu Ciudad' className='p-2 w-[300px]' onInput={handleInput} type="text" />
          <select className='p-2' value={infoCC} onChange={handleSelectChange}>
            <option disabled value="">--Selecciona tu Pais--</option>
            <option value="US">Estados Unidos</option>
            <option value="AR">Argentina</option>
            <option value="BO">Bolivia</option>
            <option value="AU">Australia</option>
            <option value="MX">Mexico</option>
            <option value="CL">Chile</option>
            
          </select>
          <Toaster/>
          <button className='font-roboto font-bold upperase bg-white text-black p-2  shadow-md hover:bg-black hover:text-white' onClick={getWeather}>Buscar</button> 
        </form>
      </div>
      <div>
        {infoWeather && infoWeather.main && infoWeather.wind && infoWeather.name && infoWeather.weather && (
            <WeatherCard
              icon={`https://openweathermap.org/img/w/${infoWeather.weather[0].icon}.png`}
              wind={infoWeather.wind.speed}
              city={infoWeather.name}
              humidity={infoWeather.main.humidity}
              temp={Math.round(infoWeather.main.temp - 273)}
            />
          )}
      </div>
    </>
  )
}

export default App
