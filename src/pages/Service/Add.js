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
      title.setValue("")
      icon.setValue("")
      desc.setValue("")
    }
  });

  const { modal, toggleModal, theme }  = props;

  const title = DefaultInput({ 
    type: "text", 
    required: true,
    name:"title",
    placeholder:"Title", 
    autoComplete:"title", 
    errorMessage: "Invalid Title"
  });

  const icon = DefaultInput({ 
    type: "icon", 
    required: true,
    name:"icon",
    placeholder:"ex: icon-newspaper",
    errorMessage: "Invalid Icon", 
  });

  const desc = DefaultInput({ 
    type: "textarea", 
    required: true,
    name:"desc",
    placeholder:"Description", 
    autoComplete:"desc", 
    errorMessage: "Invalid Description", 
  });

  const modalOpen = (modal.show && modal.context === 'add') ? true : false;
  const handleSubmit = (event) => {
    const body = {
      "title": title.value,
      "icon": icon.value,
      "desc": desc.value
    }
    Promise.resolve( props.exist('/service/exist', body) )
      .then(response => {
        if(response !== true){
          props.save('/service', body)
          props.getAll('/service')
          return response;  
        } else {

          return Promise.reject();
        }
      })
      .then(response => {
        toggleModal(false)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="md" className={"modal-"+theme}>
        <ModalHeader toggle={toggleModal}> Add Service </ModalHeader>
        <AvForm id="addUser" method="post" onValidSubmit={handleSubmit}>
          <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Title</Label>
                </Col>
                <Col xs="12" md="9">
                  { title.input }
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
                  <Label htmlFor="text-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                  { desc.input }
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
  save: submitFormActions.save,
  exist: submitFormActions.exist

}

export default connect(mapStateToProps, mapDispatchToProps)(Add)