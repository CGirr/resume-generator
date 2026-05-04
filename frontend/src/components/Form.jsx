import {useState} from "react";

export default function Form() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
    });

    function handleChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form>
            <label htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" value={formData.firstName} type="text" onChange={handleChange}/>
            <label htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" value={formData.lastName} type="text" onChange={handleChange}/>
            <label htmlFor="birthDate">Date de naissance</label>
            <input id="birthDate" name="birthDate" value={formData.birthDate} type="date" onChange={handleChange}/>
            <p>{formData.firstName}</p>
        </form>
    );
}
