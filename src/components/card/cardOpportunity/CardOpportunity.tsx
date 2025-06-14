import React from "react";
import { FaRegBookmark, FaLocationDot } from "react-icons/fa6";
import "./CardOpportunity.css";
import ButtomCard from "../../ButtomCard/ButtomCard";

type infoType = {
  title: string;
};

type OpportunityType = {
  title: string;
  subtitle: string;
  topic: string[];
  date: string;
};

export default function CardOpportunity({
  title,
  subtitle,
  topic,
  date,
}: OpportunityType) {
  console.log(topic);
  return (
    <div className="card">
      <div className="card-title">
        <div>
          <h1>{title}</h1>
          <div className="subtitle">
            <FaLocationDot className="icon" />
            <span>{subtitle}</span>
          </div>
          <div className="list-info">
            {topic?.map((value, index) => (
              <div key={index} className="topic-card">
                <div
                  style={{
                    border: "2px solid #00A8EA",
                    height: "100%",
                    backgroundColor: " #00A8EA",
                  }}
                />
                <div
                  style={{
                    border: "2px solid #DF2A8C",
                    height: "100%",
                    backgroundColor: " #DF2A8C",
                  }}
                />
                <div
                  style={{
                    border: "2px solid #FFCC00",
                    height: "100%",
                    backgroundColor: " #FFCC00",
                  }}
                />
                <div className="title-info">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <FaRegBookmark className="icon icon-book" />
      </div>
      <div className="footer-card">
        <p>{date}</p>
        <ButtomCard text_button={"Ver detalhes"} />
      </div>
    </div>
  );
}
