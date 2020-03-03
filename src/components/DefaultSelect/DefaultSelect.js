import React, { useState } from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { store } from 'stores';

const DefaultSelect = (props) => {
	const [value, setValue] = useState();    
	const theme             = store.getState().theme.theme; // if lightTheme not provided then default is dark theme
	const sortedOptions     = props.selected === undefined ? props.options :
	 props.options.reduce((acc, element) => {
	    if (element.value === props.selected) {
	      return [element, ...acc];
	    }
	    return [...acc, element];
	  }, []);
	const options = sortedOptions.map((item, index) => <option key={index} value={item.value}>{ item.label }</option> )
	const finalValue = value === '' ? sortedOptions[0].value : value;
	const input = 
		<div>
			<AvField
				className={"form-"+ theme}
				type="select"
	            name={ props.name }
	            onChange={e => setValue(e.target.value)}
	            value={value}
	        >
	        	{ options }
	        </AvField>
		</div>;

	return { value: finalValue, setValue: setValue, input: input };
	
}

export default DefaultSelect;