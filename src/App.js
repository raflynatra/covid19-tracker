import axios from "axios";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/id";

import covidLogo from "./img/logo.jfif";

function App() {
  moment.locale("id");

  const [datas, setDatas] = useState({});
  const [countryDatas, setCountryDatas] = useState({});
  const [countries, setCountries] = useState([]);

  function getData() {
    axios
      .get("https://covid19.mathdro.id/api/")
      .then(function (response) {
        setDatas(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getCountries() {
    axios
      .get("https://covid19.mathdro.id/api/countries")
      .then(function (response) {
        // handle success
        setCountries(response.data.countries);
        // console.log(response.data.countries);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function getDataByCountry(e) {
    axios
      .get(
        `https://covid19.mathdro.id/api/countries/${e.target.value}/confirmed`
      )
      .then(function (response) {
        // handle success
        setCountryDatas(response.data[0]);
        // console.log("hello", datas);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
    getCountries();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center">
        <img src={covidLogo} alt="test" className="" />
      </div>
      <div className="my-4">
        <h2 className="pb-2">Worldwide Covid Information</h2>
        <div className="d-flex justify-content-center ">
          <Card
            addClass="bg-primary bg-opacity-25"
            footerBg="bg-primary"
            type="Infected"
            title="Infected"
            text="cases of"
            total={datas.confirmed ? datas.confirmed.value : datas.confirmed}
            date={moment(datas.lastUpdate).format("LL")}
            time={moment(datas.lastUpdate).format("LT")}
          />

          <Card
            footerBg="bg-success"
            type="Recovered"
            title="Recovered"
            text="from"
            total={datas.recovered ? datas.recovered.value : datas.recovered}
            date={moment(datas.lastUpdate).format("LL")}
            time={moment(datas.lastUpdate).format("LT")}
          />

          <Card
            addClass="bg-danger bg-opacity-25"
            footerBg="bg-danger"
            type="deaths"
            title="Death"
            text="caused by"
            total={datas.deaths ? datas.deaths.value : datas.deaths}
            date={moment(datas.lastUpdate).format("LL")}
            time={moment(datas.lastUpdate).format("LT")}
          />
        </div>
      </div>
      <hr />

      <div className="mt-4">
        <h2 className="pb-2">Region Covid Information</h2>
        <div className="row justify-content-center my-4">
          <div className="col-7">
            <select
              className="form-select"
              required
              aria-label="select example"
              onChange={(e) => getDataByCountry(e)}
            >
              <option value="">Select Region</option>
              {countries.map((e, index) => {
                return (
                  <option key={index} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          <Card
            addClass="bg-primary bg-opacity-25"
            footerBg="bg-primary"
            type="Infected"
            title="Infected"
            text="cases of"
            total={countryDatas.confirmed}
            date={moment(countryDatas.lastUpdate).format("LL")}
            time={moment(countryDatas.lastUpdate).format("LT")}
            region={countryDatas.countryRegion}
          />

          <Card
            footerBg="bg-success"
            type="Recovered"
            title="Recovered"
            text="from"
            total={countryDatas.recovered}
            date={moment(countryDatas.lastUpdate).format("LL")}
            time={moment(countryDatas.lastUpdate).format("LT")}
            region={countryDatas.countryRegion}
          />

          <Card
            addClass="bg-danger bg-opacity-25"
            footerBg="bg-danger"
            type="deaths"
            title="Death"
            text="caused by"
            total={countryDatas.deaths}
            date={moment(countryDatas.lastUpdate).format("LL")}
            time={moment(countryDatas.lastUpdate).format("LT")}
            region={countryDatas.countryRegion}
          />

          <Card
            addClass="bg-warning bg-opacity-25"
            footerBg="bg-warning"
            type="Active"
            title="Active"
            text="cases of"
            total={countryDatas.active}
            date={moment(countryDatas.lastUpdate).format("LL")}
            time={moment(countryDatas.lastUpdate).format("LT")}
            region={countryDatas.countryRegion}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
