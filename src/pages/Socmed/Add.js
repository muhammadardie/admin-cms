import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label, Badge } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { modalActions, submitFormActions, loadTableActions } from 'stores';
import { DefaultInput, DefaultSubmit } from 'components';
import ReactTooltip from 'react-tooltip';

const Add = (props) => {
  useEffect(() => {
    if(props.modal.show === false){
      name.setValue("")
      icon.setValue("")
      url.setValue("")
    }
  });

  const { modal, toggleModal, theme }  = props;

  const name = DefaultInput({ 
    type: "text", 
    required: true,
    name:"name",
    placeholder:"Name", 
    autoComplete:"name", 
    errorMessage: "Invalid Name"
  });

  const icon = DefaultInput({ 
    type: "icon", 
    required: true,
    name:"icon",
    placeholder:"ex: icon-instagram",
    errorMessage: "Invalid Icon", 
  });

  const url = DefaultInput({ 
    type: "text", 
    required: true,
    name:"url",
    placeholder:"URL", 
    autoComplete:"url", 
    errorMessage: "Invalid URL", 
  });

  const modalOpen = (modal.show && modal.context === 'add') ? true : false;
  const handleSubmit = (event) => {
    const body = {
      "name": name.value,
      "icon": icon.value,
      "url": url.value
    }

    Promise.resolve( props.save('/socmeds', body) )
      .then(save => save.status && toggleModal(false))
      .then(() => props.getAll('/socmeds'))
      .catch(err => console.log(err))
  }
  
  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="md" className={"modal-"+theme}>
        <ModalHeader toggle={toggleModal}> Add Service </ModalHeader>
        <AvForm id="addUser" method="post" onValidSubmit={handleSubmit}>
          <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Name</Label>
                </Col>
                <Col xs="12" md="9">
                  { name.input }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">
                    Icon 
                    <Badge pill color="info" style={{ marginLeft: 10 }}>
                      <a target="_blank" rel="noopener noreferrer" href="https://developer.joomla.org/icomoon/demo.html"> Icon list</a>
                    </Badge>
                  </Label>
                </Col>
                <ReactTooltip />
                <Col xs="12" md="7" data-tip="Make sure icon appear right after this input field before submit form">
                  { icon.input }
                </Col>
                <Col xs="12" md="2">
                  <h1><span className={ icon.value }></span></h1>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">URL</Label>
                </Col>
                <Col xs="12" md="9">
                  { url.input }
                </Col>
              </FormGroup>
        </ModalBody>
        <ModalFooter>
          <DefaultSubmit submitText="Submit" cancelText="Cancel" />
        </ModalFooter>
         </AvForm>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
    theme: state.theme.theme
  }
}

const mapDispatchToProps = {
  toggleModal: modalActions.toggle,
  getAll: loadTableActions.getAll,
  save: submitFormActions.save

}

export default connect(mapStateToProps, mapDispatchToProps)(Add)