import {useState} from "react";

export default function TagSection( { resumeId, title, type, initialTags = [] } ) {
    const [tags, setTags] = useState(initialTags);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData ] = useState({
        name: "",
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
            type,
            resumes: [`/api/resumes/${resumeId}`],
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:8080/api/tags`, {
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
            setTags(prev => [...prev, data]);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <h2>{ title }</h2>
            {tags.map(tag => (
                <div key={tag.id}>
                    <p>{tag.name}</p>
                </div>
            ))}
            <button onClick={() => setShowForm(!showForm)}>
                + Ajouter { type }
            </button>
            {showForm && <form onSubmit={handleSubmit}>
                <label htmlFor={'name'}>Nom</label>
                <input id="name" name="name" type="text" onChange={handleChange}/>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
                </button>
            </form>}
        </>
    )
}