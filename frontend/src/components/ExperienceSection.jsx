import {useState} from "react";

export default function ExperienceSection( { resumeId, initialExperiences = [] }) {
    const [experiences, setExperiences] = useState(initialExperiences);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData ] = useState({
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrent: false,
    })

    function handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [e.target.name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...formData,
            resume: `/api/resumes/${resumeId}`,
            position: experiences.length + 1,
            endDate: formData.isCurrent ? null : (formData.endDate ? new Date(formData.endDate).toISOString() : null),
            startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:8080/api/experiences`, {
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

            setExperiences(prev => [...prev, data]);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <h2>Expériences</h2>
            {experiences.map(exp => (
                <div key={exp.id}>
                    <p>{exp.jobTitle}</p>
                    <p>{exp.company}</p>
                    <p>{exp.startDate}</p>
                    <p>{exp.endDate}</p>
                    <p>{exp.description}</p>
                    <p>{exp.isCurrent}</p>
                </div>
            ))}
            <button onClick={() => setShowForm(!showForm)}>
                + Ajouter expérience
            </button>
            {showForm && <form onSubmit={handleSubmit}>
                <label htmlFor={'jobTitle'}>Titre du poste</label>
                <input id="jobTitle" name="jobTitle" type="text" onChange={handleChange}/>
                <label htmlFor={'company'}>Entreprise</label>
                <input id="company" name="company" type="text" onChange={handleChange}/>
                <label htmlFor={'startDate'}>Date de début</label>
                <input id="startDate" name="startDate" type="date" onChange={handleChange} />
                <label htmlFor={'endDate'}>Date de fin</label>
                <input id="endDate" name="endDate" type="date" onChange={handleChange} />
                <label htmlFor={'description'}>Description</label>
                <textarea id="description" name="description" onChange={handleChange} />
                <label htmlFor={'isCurrent'}>En cours</label>
                <input id="isCurrent" name="isCurrent" type="checkbox" onChange={handleChange} />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer'}
                </button>
            </form>
            }
        </>
    )
}