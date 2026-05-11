import {useState} from "react";

export default function Form({ onSuccess }) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        city: "",
        email: "",
        phoneNumber: "",
        website: "",
        jobTitle: "",
        catchPhrase: "",
    });

    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);


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
            birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : null,
            drivingLicenses: [],
            experiences: [],
            tags: [],
            trainings: [],
        };

        setError(null);
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:8080/api/resumes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Impossible de créer le CV, veuillez réessayer plus tard.");
            }
            console.log(data);
            onSuccess(data.id);

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <>
                        <label htmlFor="firstName">Prénom</label>
                        <input id="firstName" name="firstName" value={formData.firstName} type="text" onChange={handleChange}/>
                        <label htmlFor="lastName">Nom</label>
                        <input id="lastName" name="lastName" value={formData.lastName} type="text" onChange={handleChange}/>
                        <label htmlFor="birthDate">Date de naissance</label>
                        <input id="birthDate" name="birthDate" value={formData.birthDate} type="date" onChange={handleChange}/>
                        <label htmlFor="city">Ville</label>
                        <input id="city" name="city" value={formData.city} type="text" onChange={handleChange}/>
                    </>
                ) }
                {step === 2 && (
                    <>
                        <label htmlFor="email">Adresse E-mail</label>
                        <input id="email" name="email" value={formData.email} type="email" onChange={handleChange}/>
                        <label htmlFor="phoneNumber">Numéro de Téléphone</label>
                        <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} type="tel" onChange={handleChange}/>
                        <label htmlFor="website">Site internet</label>
                        <input id="website" name="website" value={formData.website} type="url" onChange={handleChange}/>

                    </>
                )}
                {step === 3 && (
                    <>
                        <label htmlFor="jobTitle">Titre du CV</label>
                        <input id="jobTitle" name="jobTitle" value={formData.jobTitle} type="text" onChange={handleChange}/>
                        <label htmlFor="catchPhrase">Votre accroche</label>
                        <textarea
                            id="catchPhrase"
                            name="catchPhrase"
                            value={formData.catchPhrase}
                            onChange={handleChange}
                        />
                    </>
                )}
                {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)}>
                        Précédent
                    </button>
                )}
                {step < totalSteps && (
                    <button type="button" onClick={() => setStep(step + 1)}>
                        Suivant
                    </button>
                )}
                {step === totalSteps && (
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Création en cours..." : "Créez votre CV !"}
                    </button>
                )}
            </form>
            <p>Etape {step} sur {totalSteps}</p>
            {error && (
                <p style={{color: "red"}}>{error}</p>
            )}
        </>
    );
}
