import {useEffect, useState} from "react";
import ResumeDetail from "./ResumeDetail.jsx";

export default function ResumeLoader( { resumeId, onBack } ) {
    const [resume, setResume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchIriList(iris) {
        return Promise.all(
            iris.map(async (iri) => {
                const response = await fetch(`http://localhost:8080${iri}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`Impossible de charger une ressource liée`);
                }
                return data;
            })
        )
    }

    useEffect(() => {
        async function fetchResume() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`http://localhost:8080/api/resumes/${resumeId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Impossible de charger le CV");
                }

                const languages = await fetchIriList(data.languages);

                setResume({
                    ...data,
                    languages,
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

            fetchResume();
        }, [resumeId]);

        if (isLoading) {
            return <p>Chargement...</p>;
        }

        if (error) {
            return <p style={{color: "red"}}>{error}</p>;
        }

        return <ResumeDetail resume={resume} onBack={onBack} />;
}