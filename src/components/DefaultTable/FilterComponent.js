import React from 'react';
import { Button, Col, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { modalActions } from 'stores';

const TextField = styled(Input)`
    height: 32px;
    width: 200px;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
    display: inline-block; 
    margin-left: 10px;
  `;


function FilterComponent(props) {
  return (
    <Col style={ styles.column }>
      <Col>
        {
          props.actionContent.includes("add")
          &&
          <Button type="button" color="primary" onClick={ props.addModal }>
            <i className="fa fa-plus"></i> Add { props.context }
          </Button>
        }
      </Col>
      <Col>
        <Label style={ styles.label }>Search:
          <TextField id="search" type="text" className="form-control form-control-sm" value={props.filterText} onChange={ e => props.setFilterText(e.target.value) } />
        </Label>
      </Col>
    </Col>
  )
}

const styles = {
  column: {
    position: 'absolute', 
    display: 'inline-flex'
  },
  label: {
      display: 'inline-block',
      float: 'right'
  }
};

const mapDispatchToProps = {
  addModal: modalActions.add
}

export default connect(null, mapDispatchToProps)(FilterComponent)