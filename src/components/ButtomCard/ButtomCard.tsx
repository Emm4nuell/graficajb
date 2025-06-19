import "./ButtomCard.css";

export default function ButtomCard({ text_button, secondary_button=false }) {
  return <button className="buttonCard" type="submit" style={{background: secondary_button? "#373737" : "#00a8ea"}}>{text_button}</button>;
}
