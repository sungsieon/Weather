import {useState,useEffect,useCallback} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";



// 1.앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2.날씨정보에는 도시, 섭씨 화씨 날씨상태
// 3.5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 4.도시버튼을 클릭할때 마다 도시별 날씨가 나온다
// 5.현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
// 6.데이터를 들고오는 동안 로딩 스피너가 돈다



function App() {

  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState('')
  const [loading,setLoading]=useState(false);
  const cities=['paris','new york','tokyo','seoul']
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        getWeatherByCurrentLocation(lat,lon);
    });
  };
  
  const handleCityChange = (city) =>{
    if (city === "current"){
      setLoading(true)
      getCurrentLocation();
    }else {
      setCity(city);
    }
    setLoading(false)
  };

  const getWeatherByCurrentLocation = useCallback(async(lat,lon)=>{
    if (!city) return;
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9538b2ab5adfd443dd84cd5845e44335&units=metric`;
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false)
  });

  const getWeatherByCity = useCallback(async () => {
    if (!city) return; // 🌟 city가 없을 때 불필요한 요청 방지
    try {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9538b2ab5adfd443dd84cd5845e44335&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if(city === ""){
      getCurrentLocation()
    }else{
       getWeatherByCity()
    }
  },[city]);



  return (
    <div>
      {loading ? ( 
        <div className="container">
        <ClipLoader
        color= "#f88c6b" 
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      ) : (
         <div className="container">
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity} handleCityChange={handleCityChange} />
      </div>
      )}
    </div>
  );
}

export default App;
