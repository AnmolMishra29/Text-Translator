import React, { useState, useEffect } from "react";
import { Button, Form, TextArea, Icon } from "semantic-ui-react";
import axios from "axios";

const Translate = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguageKey, setSelectedLanguageKey] = useState("");
  const [detectLanguageKey, setDetectLanguageKey] = useState("");

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.com/detect`, {
        q: inputText,
      })
      .then((response) => {
        setDetectLanguageKey(response.data[0].language);
      });
  };
  const translateText = () => {
    setResultText(inputText);
    getLanguageSource();

    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };

    axios
      .post(`https://libretranslate.com/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText);
      });
  };

  const languageKey = (selectedLanguage) => {
    setSelectedLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios.get(`https://libretranslate.com/languages`).then((response) => {
      setLanguageList(response.data);
    });
    getLanguageSource();
  }, [inputText]);
  return (
    <div>
      <div className="app-header">
        <h2 className="header">Translator</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              placeholder="Type Text to Translate.."
              onChange={(e) => setInputText(e.target.value)}
            />
            <select className="language-select" onChange={languageKey}>
              <option>Please Select language..</option>
              {languageList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
            <Form.Field
              control={TextArea}
              placeholder="Your Result.."
              value={resultText}
            />

            <Button color="orange" size="large" onClick={translateText}>
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Translate;
