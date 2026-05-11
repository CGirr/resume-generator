import {useState} from "react";
import ExperienceSection from "./ExperienceSection.jsx";
import TrainingSection from "./TrainingSection.jsx";
import TagSection from "./TagSection.jsx";
import LanguageSection from "./LanguageSection.jsx";

export default function ResumeDetail( { resumeId }) {
    return (
        <>
            <h1>Détails du CV n°{resumeId}</h1>
            <ExperienceSection resumeId={resumeId} />
            <TrainingSection resumeId={resumeId} />
            <TagSection resumeId={resumeId} type="compétence" title="Compétences" />
            <TagSection resumeId={resumeId} type="hobby" title="Loisirs" />
            <TagSection resumeId={resumeId} type="atout" title="Atouts" />
            <LanguageSection resumeId={resumeId} />
        </>
    )
}