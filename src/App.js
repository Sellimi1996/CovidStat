import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } 
from "@material-ui/core";
import './App.css';
import Infobox from './Infobox';
import Map from './Jps';
import Table from './Table';
import { sortData } from "./Util";
import LineGraph from './LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  })
  // fttps://disease.sh/v3​/covid-19​/countries
  useEffect(() => {
  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response) => response.json())
    .then((data) => {
    
       const countries = data.map((country) => ({
         name: country.country,
         value: country.countryInfo.iso2,
       }));
       const sortedData = sortData(data);
       setTableData(sortedData);
       setCountries(countries);
    });
  };
  getCountriesData(); 
  }, []);

  const onCountryChange = async (event) => {
     const countryCode = event.target.value;
     
 
  const url = 
    countryCode === "worldwide" 
             ? "https://disease.sh/v3/covid-19/all"
             : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
   await fetch(url)
    .then(response => response.json())
    .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
  };
  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
      <h1>COVID-19 TRACKER </h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined"  onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">worldwide</MenuItem>
          {countries.map((country) => (
          <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
         {/* <MenuItem value="worldwide">worldwide</MenuItem>
          <MenuItem value="worldwide">worldwide</MenuItem>
          <MenuItem value="worldwide">worldwide</MenuItem>
  <MenuItem value="worldwide">worldwide</MenuItem>*/}
        </Select>
      </FormControl>  
      </div>
     <div className="app_stats">
        <Infobox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <Infobox title="Recovred" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
     </div>
     <Map/> 
      </div>
       <Card className="app_right">
         <CardContent>
           <h3>Live Cases by Country</h3>
           <Table countries={tableData} />
           <h3>Worldwide new cases</h3>
           <LineGraph />
         </CardContent>
       </Card>
    </div>
  );
}

export default App;
