import {useState} from "react";
import Form from './components/Form';
import ResumeLoader from "./components/ResumeLoader.jsx";

export default function App() {
    const [resumeId, setResumeId] = useState(null);
    const [view, setView] = useState("home");

    function handleLoadResume(e) {
        e.preventDefault();

        const id = e.target.resumeId.value;

        setResumeId(id);
        setView("detail");
    }

    function goHome() {
        setResumeId(null);
        setView("home");
    }

    if (view === "home") {
        return (
            <>
                <h1>Générateur de CV</h1>

                <button onClick={() => setView("create")}>
                    Créer un nouveau CV
                </button>

                <button onClick={() => setView("load")}>
                    Charger un CV existant
                </button>
            </>
        );
    }

    if (view === "create") {
        return (
         <Form
            onSuccess={(id) => {
                setResumeId(id);
                setView("detail");
            }}
         />
        );
    }

    if (view === "load") {
        return (
            <form onSubmit={handleLoadResume}>
                <label htmlFor="resumeId">Identifiant du CV</label>
                <input id="resumeId" name="resumeId" type="number" required />
                <button type="submit">Charger</button>
            </form>
        );
    }

    if (view === "detail") {
        return <ResumeLoader resumeId={resumeId} onBack={goHome} />;
    }
}
