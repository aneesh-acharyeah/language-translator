import React, { useState } from 'react'
import axios from 'axios';
import './TranslatorForm.css';



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
            const response = await axios.post('https://libretranslate.de/translate', {
                q: text,
                source: 'auto',
                target: toLang,
                format: 'text'
            }, {
                headers: { accept: 'application/json' }
            });
            setTranslated(false);
        } catch (error) {
            console.error('Trasnlation failed', error);
            setTranslated('Translation error.')
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="translator">
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows="5" placeholder='Enter text to translate...'>
            </textarea>

            <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
            </select>
            <button onClick={translate} disabled={loading}>
                {loading ? 'Translating...' : 'Translate'}
            </button>

            {translated && (
                <div className="result-box">
                    <h3>Translation:</h3>
                    <p>{translated}</p>
                </div>
            )}
        </div>
    )
}

export default TranslatorForm