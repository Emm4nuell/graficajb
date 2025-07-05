// CandidacCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./CandidacyCard.css";

interface CandidacyCardProps {
  total: number;
  idVacancy: string
}

export default function CandidacyCard({ total, idVacancy }: CandidacyCardProps) {
  return (
    <div className="candidacy-card">
      <div className="candidacy-card-info">
        <span className="candidacy-card-title">Candidaturas nesta vaga</span>
        <Link to={`/candidacies/${idVacancy}`} className="candidacy-card-link">
          Ver lista
        </Link>
      </div>
      <span className="candidacy-card-count">{total}</span>
    </div>
  );
}
