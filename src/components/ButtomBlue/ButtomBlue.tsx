import './ButtomBlue.css'

type ButtonBlueProps = {
  text_button: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function ButtomBlue({text_button, onClick, disabled}: ButtonBlueProps){
    return (
        <button className='buttomBlue' type='submit' disabled={disabled} onClick={onClick} style={{margin: "0 auto", cursor: disabled ? "not-allowed" : "pointer"}}>{text_button}</button>
    )
}