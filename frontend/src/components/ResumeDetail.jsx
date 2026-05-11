import ExperienceSection from "./ExperienceSection.jsx";
import TrainingSection from "./TrainingSection.jsx";
import TagSection from "./TagSection.jsx";
import LanguageSection from "./LanguageSection.jsx";

export default function ResumeDetail( { resume, onBack }) {
    return (
        <>
            <button type="button" onClick={onBack}>
                Retour à l'accueil
            </button>
            <h1>Détails du CV n°{resume.id}</h1>
            <h2>{resume.firstName} {resume.lastName}</h2>
            <ExperienceSection
                resumeId={resume.id}
                initialExperiences={resume.experiences}
            />
            <TrainingSection
                resumeId={resume.id}
                initialTrainings={resume.trainings}
            />
            <TagSection
                resumeId={resume.id}
                type="compétence"
                title="Compétences"
                initialTags={resume.tags.filter(tag => tag.type === "compétence")}
            />
            <TagSection
                resumeId={resume.id}
                type="hobby"
                title="Loisirs"
                initialTags={resume.tags.filter(tag => tag.type === "hobby")}
            />
            <TagSection
                resumeId={resume.id}
                type="atout"
                title="Atouts"
                initialTags={resume.tags.filter(tag => tag.type === "atout")}
            />
            <LanguageSection
                resumeId={resume.id}
                initialLanguages={resume.languages}
            />
        </>
    )
}