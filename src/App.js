import React, { useState } from 'react'
import axios from 'axios'
import styled, { css } from 'styled-components'
import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'
import './App.css'
import Editor from './components/Editor'

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: block;
  color: white;
  width: 100%;
  overflow: scroll;
  font-family: 'Open Sans', sans-serif;
`

const Heading = styled.h1`
  text-align: center;
  color: #fff;
  font-size: 24px;
  width: 100%;
  display: block;
`

const Column = styled.div`
  width: 50%;
  padding: 0 auto;
  position: relative;
  height: 100%;
  display: inline-block;
`

const Button = styled.button`
  padding: 1em 3em;
  width: auto;
  margin: 2em 1em 0;
  width: 165px;
  background: #ef6544;
  border-radius: 4px;
  border: none;
  color: #fff;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  border: 2px solid #ef6544;
  &:hover {
    background: #fff;
    color: #ef6544;
  }
  ${props =>
    props.disabled &&
    css`
      background: gray;
      color: #fff;
      cursor: not-allowed;
      border-color: gray;
      &:hover {
        background: gray;
        color: #fff;
        border-color: gray;
      }
    `}
`

const Link = styled.a`
  text-decoration: underline;
  color: #fff;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  &:hover {
    color: #ef6544;
  }
`

const LanguagePickerContainer = styled.div`
  color: #fff;
  text-align: center;
  margin: 1em auto 0;
  display: block;
`

const LanguagePicker = styled(ReactFlagsSelect)`
  display: inline-block;
  margin: 1em;
  width: auto;
  background: #fff;
`

function App() {
  const [enJson, setEnJson] = useState(JSON.stringify({ hello: 'Hello', world: 'World' }, null, 2))
  const [output, setOutPut] = useState('')
  const [locale, setLocale] = useState('fr')
  const languages = { PT: 'pt', FR: 'fr', ES: 'es', CN: 'zh-CN', DE: 'de', NL: 'nl' }
  const translate = () => {
    try {
      const json = JSON.parse(enJson)
      axios({
        method: 'post',
        url: '/translate',
        data: {
          input: json,
          locale,
        },
      })
        .then(({ data }) => {
          const translatedJson = JSON.stringify(data, null, 2)
          console.log(translatedJson)
          setOutPut(translatedJson)
        })
        .catch(e => setOutPut('Error Translating'))
    } catch (e) {
      console.log(e)
      setOutPut('Error Translating')
      return false
    }
  }

  const selectLanguage = flag => {
    const locale = languages[flag]
    setLocale(locale)
  }

  const clearOutput = () => {
    setOutPut('')
  }

  const downloadTranslations = () => {
    const data = `text/json;charset=utf-8,${encodeURIComponent(output)}`
    return `data:${data}`
  }

  return (
    <AppContainer>
      <Heading>Privy JSON Language Translator!</Heading>
      <Button onClick={translate} disabled={!!output}>
        Translate Text
      </Button>
      <Button disabled={!output} onClick={clearOutput}>
        Reset
      </Button>
      <LanguagePickerContainer>
        Select the output language
        <LanguagePicker
          countries={['PT', 'FR', 'ES', 'CN', 'DE', 'NL']}
          defaultCountry="FR"
          customLabels={languages}
          placeholder="Select Language"
          showSelectedLabel={false}
          onSelect={selectLanguage}
        />
      </LanguagePickerContainer>
      <Column>
        <h4>English JSON input </h4>
        <Editor code={enJson} onChange={setEnJson} />
      </Column>
      <Column>
        {output && (
          <div>
            <h4>
              {locale.toUpperCase()} JSON Output:{' '}
              <Link href={downloadTranslations()} download={`${locale}.json`}>
                Download JSON
              </Link>
            </h4>
            <Editor code={output} onChange={setOutPut} readOnly={true} />
          </div>
        )}
      </Column>
    </AppContainer>
  )
}

export default App
