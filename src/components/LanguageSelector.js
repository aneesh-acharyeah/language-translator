import React from 'react';
import '../LanguageSelector.css'; // optional: for styling

function LanguageSelector({ languages, selectedLang, onChange, label }) {
    return (
        <div className="language-selector">
            {label && <label>{label}</label>}
            <select value={selectedLang} onChange={(e) => onChange(e.target.value)}>
                {
                    languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default LanguageSelector;