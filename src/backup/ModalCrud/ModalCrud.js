import React, { useState } from 'react';
import { Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { modalActions } from 'stores';

const ModalCrud = (props) => {
  const { isOpen, toggle } = props;

  const handleSubmit = (event) => { }
  
  return (
    <div>
      <Modal isOpen={props.modal.show} toggle={props.toggleModal} size="md">
        <ModalHeader toggle={props.toggleModal}></ModalHeader>
        <Form id="loginForm" method="post" onSubmit={handleSubmit}>
          <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Username</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="username" name="username" placeholder="Username" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Email</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="email" id="email" name="email" placeholder="Email" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Password</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="password" id="password" name="password" placeholder="Password" />
                </Col>
              </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Submit</Button>{' '}
          <Button color="secondary" onClick={props.toggleModal}>Cancel</Button>
        </ModalFooter>
         </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = {
  toggleModal: modalActions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCrud)