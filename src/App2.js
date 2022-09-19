import axios from "axios";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/id";

import covidLogo from "./img/logo.jfif";
import Chart from "./components/Chart";

function App2() {
  moment.locale("id");

  const [datas, setDatas] = useState({});
  const [countryDatas, setCountryDatas] = useState({});
  const [countries, setCountries] = useState([]);

  function getData() {
    axios
      .get("https://covid19.mathdro.id/api/countries/indonesia/")
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
        console.log("hello", countryDatas);
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
    <div className="container py-4">
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
        <div className="row my-4">
          <div className="col-4">
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
            <div className="card mt-4">
              <div className="card-header">
                <h3 className="card-title">
                  {countryDatas.countryRegion} COVID-19 stats
                </h3>
              </div>
              <div className="card-body">
                <p className="card-text text-warning">
                  <strong>Active :</strong> {countryDatas.active}
                </p>
                <p className="card-text text-primary">
                  <strong>Infected :</strong> {countryDatas.confirmed}
                </p>
                <p className="card-text text-success">
                  <strong>Recovered :</strong>{" "}
                  {countryDatas.recovered === null
                    ? "0"
                    : countryDatas.recovered}
                </p>
                <p className="card-text text-danger">
                  <strong>Death :</strong> {countryDatas.deaths}
                </p>
              </div>
              <div className="card-footer">
                <p>
                  Last Update at :{" "}
                  {moment(countryDatas.lastUpdate).format("LL")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-8">
            <Chart datas={countryDatas} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App2;
