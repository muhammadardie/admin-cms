import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import { AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';

const DefaultInput = (props) => {
	let defaultValue = props.default ? props.default : '';
	useEffect(() => { setValue(defaultValue) }, [defaultValue]);

	const [value, setValue] = useState('');

	const input = 
		<div>
			{ props.custom === true ? 
				<AvField
					required={ props.required }
					type={ props.type }
		            name={ props.name }
		            value={value}
		            onChange={e => setValue(e.target.value)}
		            placeholder={ props.placeholder } 
		            autoComplete={ props.autoComplete }
		            errorMessage={ props.errorMessage } 
		        />
            :
				<AvGroup>
					<Label for={ props.label }> { props.label }</Label>
					<AvInput 
		              required={ props.required }
		              label={ props.label }
		              name={ props.name }
		              value={value}
		              onChange={e => setValue(e.target.value)}
		              type={ props.type }
		              placeholder={ props.placeholder } 
		              autoComplete={ props.autoComplete }
		              errorMessage={ props.errorMessage }
		            />
		            <AvFeedback>Invalid email address</AvFeedback>
	            </AvGroup>
	    	}
		</div>;

	return { value: value, setValue: setValue,input: input };
	
}

export default DefaultInput;