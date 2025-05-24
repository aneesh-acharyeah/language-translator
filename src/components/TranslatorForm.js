import React, { useState } from 'react';
import '../TranslatorForm.css';
import LanguageSelector from './LanguageSelector';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
];

function TranslatorForm() {
    const [text, setText] = useState('');
    const [toLang, setToLang] = useState('es');
    const [translated, setTranslated] = useState('');
    const [loading, setLoading] = useState(false);

    const translate = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const response = await fetch("https://libretranslate.de/translate", {
                method: "POST",
                body: JSON.stringify({
                    q: text,
                    source: "auto",
                    target: toLang,
                    format: "text"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            setTranslated(data.translatedText);
        } catch (error) {
            console.error('Translation failed', error);
            setTranslated('Translation error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="translator">
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                rows="5" 
                placeholder='Enter text to translate...'
            />
            
            <LanguageSelector
                languages={languages}
                selectedLang={toLang}
                onChange={setToLang}
                label="Translate to"
            />
            
            <button onClick={translate} disabled={loading || !text}>
                {loading ? 'Translating...' : 'Translate'}
            </button>

            {translated && (
                <div className="result-box">
                    <h3>Translation:</h3>
                    <p>{translated}</p>
                </div>
            )}
        </div>
    );
}

export default TranslatorForm;