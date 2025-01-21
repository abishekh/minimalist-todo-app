import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

function DayList() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [weather, setWeather] = useState({
    temp: null,
    time: new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  });

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        // Fetch weather data from Open-Meteo with proper error handling
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`
        );
        
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        
        // Safely access the temperature data
        if (data && data.current && data.current.temperature_2m !== undefined) {
          setWeather(prev => ({
            ...prev,
            temp: Math.round(data.current.temperature_2m)
          }));
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    getCurrentWeather();
  }, []);

  return (
    <div className="day-list">
      {DAYS.map((day, index) => (
        <div 
          key={day} 
          className={`day-section ${index === selectedDay ? 'expanded' : ''}`}
          onClick={() => setSelectedDay(index)}
        >
          <h2>{day}</h2>
          {index === selectedDay && (
            <>
              <p className="date">
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })} — {weather.time} — {weather.temp ? `${weather.temp}°` : '--°'}
              </p>
              <TodoList />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default DayList;
