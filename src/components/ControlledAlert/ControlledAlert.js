import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { alertActions } from 'stores';

const ControlledAlert = (props) => {
	props.timeout && setTimeout( props.clear, props.timeout )
	
  	return (
  		<div>
  			<Alert color={ props.color } isOpen={props.visible} toggle={props.clear}>
		      { props.message }
		    </Alert>
  		</div>
  	)
}

const mapDispatchToProps = {
  clear: alertActions.clear
}


export default connect(null, mapDispatchToProps)(ControlledAlert)

