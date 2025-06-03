import './CustomInputText.css'

export default function CustomInputText({type_input, label, placeholder}){
    return (
        <div id='custom-input'>
            <label htmlFor='input'>{label}</label>
            <input type={type_input} id="input" placeholder={placeholder}/>
        </div>
    )
}