import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { modalActions } from 'stores';
import { dateToString, imageUrl } from 'helpers';
import ModalImage from "react-modal-image";

const Detail = (props) => {
  const { modal, toggleModal, theme }  = props;
  const modalOpen = (modal.show && modal.context === 'detail') ? true : false;
  let { avatar, username, comment,  createdAt, updatedAt } = modal.row ? modal.row : '';

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" className={"modal-"+theme}>
        <ModalHeader toggle={toggleModal}> Detail Testimony </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Image</Label>
              </Col>
              <Col xs="12" md="9">
                { avatar && <ModalImage
                    small={imageUrl.carousel + avatar}
                    large={imageUrl.carousel + avatar}
                    className="image-thumbnail"                
                  />
                }
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Username</Label>
              </Col>
              <Col xs="12" md="9">
                <code>{ username }</code>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Comment</Label>
              </Col>
              <Col xs="12" md="9">
                <code>{ comment }</code>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Created At</Label>
              </Col>
              <Col xs="12" md="9">
                <code>{ dateToString(createdAt, true) }</code>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Updated At</Label>
              </Col>
              <Col xs="12" md="9">
                <code>{ dateToString(updatedAt, true) }</code>
              </Col>
            </FormGroup>
          </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
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
  toggleModal: modalActions.toggle

}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)