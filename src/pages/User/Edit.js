import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { modalActions, submitFormActions, loadTableActions } from 'stores';
import { DefaultInput, DefaultSubmit } from 'components';

const Edit = (props) => {
  useEffect(() => {
    if(props.modal.show === false){
      username.setValue("")
      email.setValue("")
      password.setValue("")
    }
  });
  const { modal, toggleModal, theme }  = props;
  const username = DefaultInput({ 
    default: modal.row ? modal.row.username : '',
    type: "text", 
    required: true,
    custom: true,
    name:"username",
    placeholder:"Username", 
    autoComplete:"username", 
    errorMessage: "Invalid Username", 
  });

  const email = DefaultInput({ 
    default: modal.row ? modal.row.email : '',
    type: "email", 
    required: true,
    custom: true,
    name:"email",
    placeholder:"Email", 
    autoComplete:"email", 
    errorMessage: "Invalid Email", 
  });

  const password = DefaultInput({ 
    type: "password", 
    required: false,
    custom: true,
    name:"password",
    placeholder:"Password", 
    autoComplete:"password", 
    errorMessage: "Invalid Password", 
  });

  const modalOpen = (modal.show && modal.context === 'edit') ? true : false;
  const handleSubmit = (event) => {
    const body = password.value !== '' ? 
      {
        "username": username.value,
        "email": email.value,
        "password": password.value
      } :
      {
        "username": username.value,
        "email": email.value
      };

    let id = modal.row ? modal.row._id : '';

    Promise.resolve( props.update(`/user/${id}`, body) )
      .then(function (response) {
        props.getAll('/user')
        return response;
      })
      .then(function(response){
        toggleModal(false)
      })
  }

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="md" className={"modal-"+theme}>
        <ModalHeader toggle={toggleModal}> Edit User </ModalHeader>
        <AvForm id="addUser" method="post" onValidSubmit={handleSubmit}>
          <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Username</Label>
                </Col>
                <Col xs="12" md="9">
                  { username.input }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Email</Label>
                </Col>
                <Col xs="12" md="9">
                  { email.input }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Password</Label>
                </Col>
                <Col xs="12" md="9">
                  { password.input }
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
  update: submitFormActions.update

}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)