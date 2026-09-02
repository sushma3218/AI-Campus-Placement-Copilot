import Dashboard from "./Dashboard";

function ResultCard({ result }) {
  if (!result) return null;
  return <Dashboard result={result} />;
}

export default ResultCard;