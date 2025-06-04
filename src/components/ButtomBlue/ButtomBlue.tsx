import './ButtomBlue.css'

export default function ButtomBlue({text_button}){
    return (
        <button type='submit' className="w-[14rem] h-[3.9375rem] rounded-[4.78125rem] bg-[#00A8EA] text-white text-base font-semibold leading-[1.625rem] cursor-pointer" style={{margin: "0 auto"}}>{text_button}</button>
    )
}