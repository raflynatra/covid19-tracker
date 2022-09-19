import axios from 'axios';
import Card from './components/Card';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/id';



function App() {

  moment.locale('id');

  const [datas, setDatas] = useState({});
  const [countries, setCountries] = useState([])



  function getCountries() {
    axios.get('https://covid19.mathdro.id/api/countries')
      .then(function (response) {
        // handle success
        setCountries(response.data.countries);
        console.log(response.data.countries);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  function getData(e) {
    axios.get((`https://covid19.mathdro.id/api/countries/${e.target.value}/confirmed`))
      .then(function (response) {
        // handle success
        setDatas(response.data[0]);
        console.log("hello", datas);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    // getData();
    getCountries();
  }, [])

  return (
    <div className='container'>
      <div className="d-flex justify-content-center mt-4">

        <Card addClass="bg-primary bg-opacity-25" type="Infected" title="Infected" text= 'cases of' total={datas.confirmed} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} region={datas.countryRegion} />

        <Card type="Recovered" title="Recovered" text= 'from' total={datas.recovered} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} region={datas.countryRegion} />

        <Card addClass="bg-danger bg-opacity-25" type="deaths" title="Death" text= 'caused by' total={datas.deaths} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} region={datas.countryRegion} />
       
        <Card addClass="bg-warning  bg-opacity-25" type="Active" title="Active" text= 'cases of' total={datas.active} date={moment(datas.lastUpdate).format('LL')} time={moment(datas.lastUpdate).format('LT')} region={datas.countryRegion} />

      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-7">

          <select className="form-select" required aria-label="select example" onChange={(e) => getData(e)}>
            <option value="">Pilih Negara</option>
            {
              countries.map((e, index) => {
                return <option key={index} value={e.name}>{e.name}</option>
              })
            }

          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
