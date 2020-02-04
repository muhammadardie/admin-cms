import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { modalActions, submitFormActions, loadTableActions } from 'stores';

const Delete = (props) => {
  const { modal, data, toggleModal }  = props;
  const modalOpen = (modal.show && modal.context === 'delete') ? true : false;
  const handleSubmit = (event) => {
    Promise.resolve( props.destroy('/user', modal.row._id) )
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
      <Modal isOpen={modalOpen} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}> Delete User </ModalHeader>
        <AvForm id="deleteUser" method="post" onValidSubmit={handleSubmit}>
          <ModalBody>
              <h6>Are you sure want to delete user with username <code>{ modal.row && modal.row.username }</code> ?</h6>
          </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" disabled={data.loading}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>No</Button>
        </ModalFooter>
        </AvForm>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.submitForm,
    modal: state.modal
  }
}

const mapDispatchToProps = {
  toggleModal: modalActions.toggle,
  getAll: loadTableActions.getAll,
  destroy: submitFormActions.destroy

}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)