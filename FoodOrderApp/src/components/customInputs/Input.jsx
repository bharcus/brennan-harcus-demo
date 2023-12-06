export default function Input({label, type, name, ...props}) {
    return (
        <div className="control">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} {...props}/>
        </div>
    );
}