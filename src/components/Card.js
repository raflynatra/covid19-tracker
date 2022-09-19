import React from 'react';
import moment from 'moment';


function Card(props) {
    return (
        <div className="mx-2 ">
            <div className={`card ${props.addClass}`} style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title" >{props.title}</h5>
                    <h4 className="card-title mb-2">total : {props.total ? new Intl.NumberFormat().format(props.total) : "0"} </h4>
                    <p className="card-text">Last Update at.</p>
                    <p className="card-text">{props.date}</p>
                    <p className="card-text">{props.time} </p>
                    <p className="card-text">Number of {props.title} {props.text} COVID-19</p>
                    <p className="card-text">{props.region}</p>
                </div>
            </div>
        </div>
    )
}


export default Card