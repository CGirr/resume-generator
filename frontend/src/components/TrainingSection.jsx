import {useState} from "react";

export default function TrainingSection( { resumeId }) {
    const [trainings, setTrainings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData ] = useState({
        school: "",
        degree: "",
        graduationYear: "",
        description: "",
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
            graduationYear: parseInt(formData.graduationYear),
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:8080/api/trainings`, {
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

            setTrainings(prev => [...prev, data]);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <h2>Formations</h2>
            {trainings.map(training => (
                <div key={training.id}>
                    <p>{training.school}</p>
                    <p>{training.degree}</p>
                    <p>{training.graduationYear}</p>
                    <p>{training.description}</p>
                </div>
            ))}
            <button onClick={() => setShowForm(!showForm)}>
                + Ajouter formation
            </button>
            {showForm && <form onSubmit={handleSubmit}>
                <label htmlFor={'school'}>Établissement</label>
                <input id="school" name="school" type="text" onChange={handleChange}/>
                <label htmlFor={'degree'}>Diplôme</label>
                <input id="degree" name="degree" type="text" onChange={handleChange}/>
                <label htmlFor={'graduationYear'}>Année d'obtention</label>
                <input id="graduationYear" name="graduationYear" type="number" onChange={handleChange} />
                <label htmlFor={'description'}>Description</label>
                <textarea id="description" name="description" onChange={handleChange} />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
                </button>
            </form>
            }
        </>
    )
}