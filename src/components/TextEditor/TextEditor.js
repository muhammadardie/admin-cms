import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (props) => {
  const [value, setValue] = useState('');
  const [quillRef, setQuillRef] = useState();

  let defaultValue = props ? props.default : '';
  useEffect(() => { setValue(defaultValue) }, [defaultValue]);

  const input = <ReactQuill 
        	ref={(el) => setQuillRef(el) }
        	value={ value }
            onChange={ (val) => setValue(val) } 
        />;
  const textInputted = quillRef && quillRef.getEditor().getText();

  return { value: value, setValue: setValue, input: input, text: textInputted };
  
}

export default TextEditor;