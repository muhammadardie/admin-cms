import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label } from 'reactstrap';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { modalActions, submitFormActions, loadTableActions } from 'stores';
import { DefaultInput, DefaultSelect, DefaultSubmit, FileInput, TextEditor } from 'components';
import { toastr } from 'react-redux-toastr';

const Add = (props) => {
  useEffect(() => {
    if(props.modal.show === false){
      image.setValue("")
      page.setValue("")
      tagdesc.setValue("")
      tagline.setValue("")
    }
  });

  const { modal, toggleModal, theme }  = props;

  const image = FileInput({ 
    maxSize: "2MB", 
    accepted: ['image/png', 'image/jpeg', 'image/jpg'],
    minWidth: "1920",
    maxWidth: "1920",
    minHeight: "871",
    maxHeight: "871",
  });

  const page = DefaultSelect({
    options: [
      { value: 'About', label: 'About' },
      { value: 'Blog', label: 'Blog' },
      { value: 'Contact', label: 'Contact' },
      { value: 'Feature', label: 'Feature' },
      { value: 'Work', label: 'Work' }
    ],
    name:"page",
  });

  const tagdesc = TextEditor();

  const tagline = DefaultInput({ 
    type: "text", 
    required: false,
    placeholder:"Tagline", 
    name:"tagline",
    errorMessage: "Invalid Tagline", 
  });

  const modalOpen = (modal.show && modal.context === 'add') ? true : false;
  const handleSubmit = (event) => {
    let errContext = '';
    const pondError = 8;
    if (image.value === "" || (image.pond && image.pond.status === pondError)) {
      errContext = 'Image'
    }  else if (tagline.value === '') {
      errContext = 'Tagline'
    } else if (tagdesc.value === '' || tagdesc.value === '<p><br></p>') {
      errContext = 'Tag Description'
    }

    if (errContext !== '') {
      toastr.error('', errContext+' is required')
      return;
    }

    const body = new FormData()
      body.append('image', image.value[0]) // first image only
      body.append('page', page.value)
      body.append('tagline', tagline.value)
      body.append('tagdesc', tagdesc.value)

    const checkExist = {
      "page": page.value
    }

    Promise.resolve( props.exist('/header/exist', checkExist) )
      .then(res => res.exist === false ? props.save('/header', body, true) : Promise.reject())
      .then(save => save.status && toggleModal(false))
      .then(() => props.getAll('/header'))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg" className={"modal-"+theme}>
        <ModalHeader toggle={toggleModal}> Add Header </ModalHeader>
        <AvForm id="addHeader" method="post" onValidSubmit={handleSubmit}>
          <ModalBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Image</Label>
                </Col>
                <Col xs="12" md="9">
                  { image.input }
                  <small className="help-block form-text text-muted">allowed type: jpg, jpeg, png; max: 2mb; dimension: 1920x871</small>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Page</Label>
                </Col>
                <Col xs="12" md="9">
                  { page.input }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Tagline</Label>
                </Col>
                <Col xs="12" md="9">
                  { tagline.input }
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Tag Description</Label>
                </Col>
                <Col xs="12" md="9">
                  { tagdesc.input }
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