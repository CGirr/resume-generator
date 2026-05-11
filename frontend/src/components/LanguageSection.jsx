import {useState} from "react";

export default function LanguageSection( { resumeId }) {
    const [languages, setLanguages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData ] = useState({
        name: "",
        level: "",
    })

    function handleChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...formData,
            resume: `/api/resumes/${resumeId}`,
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:8080/api/languages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout")
            }
            setLanguages(prev => [...prev, data]);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <h2>Langues</h2>
            {languages.map(language => (
                <div key={language.id}>
                    <p>{language.name}</p>
                    <p>{language.level}</p>
                </div>
            ))}
            <button onClick={() => setShowForm(!showForm)}>
                + Ajouter langue
            </button>
            {showForm && <form onSubmit={handleSubmit}>
                <label htmlFor="name">Langue</label>
                <input id="name" name="name" type="text" onChange={handleChange}/>
                <label htmlFor={'level'}>Niveau</label>
                <input id="level" name="level" type="text" onChange={handleChange}/>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
                </button>
            </form>}
        </>
    )
}
