import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { modalActions } from 'stores';

function ActionCell(props) {
	return (
	  <div key={props.row.index} style={{ color: '#4638c2' }}>
	  	{
          props.actionContent.includes("detail")
          &&
	      <i 
	      	style={{ marginLeft: 10, cursor: 'pointer' }} 
	      	className="fa fa-eye" 
	      	data-tip={"Detail " + props.context}
	      	onClick={() => props.detailModal(props.row)}>
	      </i>
	  	}
	  	{
          props.actionContent.includes("edit")
          &&
	      <i 
	      	style={{ marginLeft: 10, cursor: 'pointer' }} 
	      	className="fa fa-pencil" 
	      	data-tip={"Edit " + props.context}
	      	onClick={() => props.editModal(props.row)}>
	      </i>
	  	}
	  	{
          props.actionContent.includes("delete")
          &&
	      <i 
	      	style={{ marginLeft: 10, cursor: 'pointer' }} 
	      	className="fa fa-trash" 
	      	data-tip={"Delete " + props.context}
	      	onClick={() => props.deleteModal(props.row)}>
	      </i>
	  	}
	      <ReactTooltip />
	  		
	  </div>
	 );
};

const mapDispatchToProps = {
	detailModal: modalActions.detail, 
	editModal: modalActions.edit,
	deleteModal: modalActions.deleteModal,
}

export default connect(null, mapDispatchToProps)(ActionCell)