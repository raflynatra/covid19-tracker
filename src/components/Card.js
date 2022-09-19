import React from "react";

function Card(props) {
  return (
    <div className="mx-2 ">
      <div className={`card ${props.addClass}`} style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h4 className="card-title mb-2">
            Total :{" "}
            {props.total ? new Intl.NumberFormat().format(props.total) : "0"}{" "}
          </h4>
          <p className="card-text">Last Update at.</p>
          <p className="card-text">{`${props.date} : ${props.time}`}</p>
          <p className="card-text">
            Number of {props.title} {props.text} COVID-19
          </p>
          {props.region === undefined ? (
            ""
          ) : (
            <p className="card-text">{props.region}</p>
          )}
        </div>
        <div className={`card-footer ${props.footerBg}`}></div>
      </div>
    </div>
  );
}

export default Card;
