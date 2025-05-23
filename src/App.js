import React,{useState} from 'react';
import TranslatorForm from './components/TranslatorForm';
import './App.css';


function App() {
  return (
     <div className="app-container">
      <h1>Multi-Language Translator</h1>
      <TranslatorForm/>
     </div>
  )
}

export default App