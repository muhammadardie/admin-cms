import React, { useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import FilterComponent from './FilterComponent';
import ActionCell from './ActionCell';

const customStyles = {
	headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 700,
        backgroundColor: '#000d17'
      }
    }
};

createTheme('solarized', {
	text: {
	  primary: '#FFFFFF',
	  secondary: '#2aa198',
	},
	background: {
	  default: 'transparent',
	},
	context: {
	  background: '#cb4b16',
	  text: '#FFFFFF',
	},
	divider: {
	  default: '#073642',
	},
	button: {
	  default: '#2aa198',
	  hover: 'rgba(0,0,0,.08)',
	  focus: 'rgba(255,255,255,.12)',
	  disabled: 'rgba(0,0,0,.12)',
	},
	sortFocus: {
	  default: '#2aa198',
	},
});

const DefaultTable = (props) => {
	const { loading, data } = props.data;
	const [filterText, setFilterText] = useState('');
	const actionButton = {
	    name: 'Action',
	    cell: row => <ActionCell row={row} context={props.context} actionContent={props.actionContent}/>,
	    ignoreRowClick: true,
	    allowOverflow: true,
	    button: true,
	}
	const columns = props.actionButton ? [...props.columns, actionButton] : [...props.columns];
	const filteredItems = data ? data
							.filter(item => {
                            	for (var key in props.filteredColumns) {
                            		let filterCol = props.filteredColumns[key]
	                            	if(item[filterCol] && item[filterCol].toLowerCase().includes(filterText && filterText.toLowerCase())){
	                            		return true;
	                            	}
	                            }

	                            return false;
                            })
							.map( (datum, index) => {
								index += 1;

								return { index , ...datum }
							})
                            :
                            [];
    return(
    	<DataTable
		  columns={columns}
		  data={filteredItems}
		  pagination
		  paginationPerPage={5}
		  paginationRowsPerPageOptions={ [5,10,15,20] }
		  subHeader
		  subHeaderComponent={ 
		  	<FilterComponent 
		  		context={props.context} 
		  		setFilterText={setFilterText} 
		  		filterText={filterText } 
		  		actionContent={props.actionContent}
		  	/> 
		  }
		  theme="solarized"
		  highlightOnHover={true}
		  noHeader={true}
		  customStyles={customStyles}
		  progressPending={loading}
		/>
    )
}


export default DefaultTable;