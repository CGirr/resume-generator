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
            <ExperienceSection resumeId={resume.id} />
            <TrainingSection resumeId={resume.id} />
            <TagSection resumeId={resume.id} type="compétence" title="Compétences" />
            <TagSection resumeId={resume.id} type="hobby" title="Loisirs" />
            <TagSection resumeId={resume.id} type="atout" title="Atouts" />
            <LanguageSection
                resumeId={resume.id}
                initialLanguages={resume.languages}
            />
        </>
    )
}