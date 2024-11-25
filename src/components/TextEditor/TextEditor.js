import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';

const TextEditor = (props) => {
  const [value, setValue] = useState('');

  let defaultValue = props ? props.default : '';
  useEffect(() => { setValue(defaultValue) }, [defaultValue]);

  const input = <ReactQuill
                  theme="snow"
                	value={ value }
                  onChange={ (val) => setValue(val) } 
                />;

  return { value: value, setValue: setValue, input: input };
  
}

export default TextEditor;