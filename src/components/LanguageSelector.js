import React from 'react';
import {connect} from 'react-redux';
import {setLanguage} from '../actions';

const LanguageSelector = ({language, setLanguage}) => {
    const languages = [
        {
            "code": "af",
            "display": "Afrikaans"
        }, {
            "code": "ar",
            "display": "Arabic"
        }, {
            "code": "hy",
            "display": "Armenian"
        }, {
            "code": "be",
            "display": "Belarusian"
        }, {
            "code": "bg",
            "display": "Bulgarian"
        }, {
            "code": "ca",
            "display": "Catalan"
        }, {
            "code": "zh-CN",
            "display": "(Simplified)"
        }, {
            "code": "zh-TW",
            "display": "(Traditional)"
        }, {
            "code": "hr",
            "display": "Croatian"
        }, {
            "code": "cs",
            "display": "Czech"
        }, {
            "code": "da",
            "display": "Danish"
        }, {
            "code": "nl",
            "display": "Dutch"
        }, {
            "code": "en",
            "display": "English"
        }, {
            "code": "eo",
            "display": "Esperanto"
        }, {
            "code": "et",
            "display": "Estonian"
        }, {
            "code": "tl",
            "display": "Filipino"
        }, {
            "code": "fi",
            "display": "Finnish"
        }, {
            "code": "fr",
            "display": "French"
        }, {
            "code": "de",
            "display": "German"
        }, {
            "code": "el",
            "display": "Greek"
        }, {
            "code": "iw",
            "display": "Hebrew"
        }, {
            "code": "hi",
            "display": "Hindi"
        }, {
            "code": "hu",
            "display": "Hungarian"
        }, {
            "code": "is",
            "display": "Icelandic"
        }, {
            "code": "id",
            "display": "Indonesian"
        }, {
            "code": "it",
            "display": "Italian"
        }, {
            "code": "ja",
            "display": "Japanese"
        }, {
            "code": "ko",
            "display": "Korean"
        }, {
            "code": "lv",
            "display": "Latvian"
        }, {
            "code": "lt",
            "display": "Lithuanian"
        }, {
            "code": "no",
            "display": "Norwegian"
        }, {
            "code": "fa",
            "display": "Persian"
        }, {
            "code": "pl",
            "display": "Polish"
        }, {
            "code": "pt",
            "display": "Portuguese"
        }, {
            "code": "ro",
            "display": "Romanian"
        }, {
            "code": "ru",
            "display": "Russian"
        }, {
            "code": "sr",
            "display": "Serbian"
        }, {
            "code": "sk",
            "display": "Slovak"
        }, {
            "code": "sl",
            "display": "Slovenian"
        }, {
            "code": "es",
            "display": "Spanish"
        }, {
            "code": "sw",
            "display": "Swahili"
        }, {
            "code": "sv",
            "display": "Swedish"
        }, {
            "code": "th",
            "display": "Thai"
        }, {
            "code": "tr",
            "display": "Turkish"
        }, {
            "code": "uk",
            "display": "Ukrainian"
        }, {
            "code": "vi",
            "display": "Vietnamese"
        }
    ];

    return <div>
        <h2>Language</h2>
            <select value={language} onChange={(e) => {
                setLanguage(e.target.value)
            }}>
                {languages.map((l) => {
                    return <option key={`language-${l.code}`} value={l.code}>{l.display}</option>
                })}

            </select>
    </div>
}

const mapStateToProps = (state) => {
    return {language: state.language}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (language) => {
            dispatch(setLanguage(language));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)
