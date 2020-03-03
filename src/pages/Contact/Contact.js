import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row,
  FormGroup,
  Label,
  Spinner 
} from 'reactstrap'; 
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { loadTableActions, submitFormActions } from 'stores';
import { DefaultInput, DefaultSubmit } from 'components';

const Contact = (props) => {
  const { data, theme, getAll } = props;
  React.useLayoutEffect(() => { getAll('/contact') }, [getAll]);

  const phone = DefaultInput({ 
    default: data ? data[0].phone : '',
    type: "text", 
    required: true,
    name:"phone",
    placeholder:"Phone", 
    autoComplete:"phone", 
    errorMessage: "Invalid Phone", 
  });

  const mail = DefaultInput({ 
    default: data ? data[0].mail : '',
    type: "email", 
    required: true,
    name:"mail",
    placeholder:"Email", 
    autoComplete:"mail", 
    errorMessage: "Invalid Email", 
  });

  const address = DefaultInput({ 
    default: data ? data[0].address : '',
    type: "textarea", 
    required: true,
    name:"address",
    placeholder:"Address", 
    autoComplete:"address", 
    errorMessage: "Invalid Address", 
  });

  const handleSubmit = (event) => {
    let id = data ? data[0]._id : '';

    const body = {
      phone: phone.value,
      mail: mail.value,
      address: address.value
    }
    Promise.resolve( props.update(`/contact/${id}`, body) )
      .then(update => update.status && props.getAll('/contact'))
      .catch(err => console.log(err))
  }
    return (
      data ?
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className={ 'card-' + theme }>
              <CardHeader>
                <h5>
                <i className="fa fa-phone"></i> Contact
                </h5>
              </CardHeader>
              <CardBody>
              <AvForm id="addContact" method="post" onValidSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Phone</Label>
                  <div className="controls">
                      { phone.input }
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <div className="controls">
                      { mail.input }
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <div className="controls">
                      { address.input }
                  </div>
                </FormGroup>
                <br />
                <DefaultSubmit submitText="Submit" />
              </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>        
      </div>
      :
      <div>
        <center><Spinner color="primary" style={{ width: '3rem', height: '3rem' }}  /></center>
      </div>
    );
  }

const mapStateToProps = state => {
  return {
    data: state.loadTable.data,
    theme: state.theme.theme
  }
}

const mapDispatchToProps = {
  getAll: loadTableActions.getAll,
  update: submitFormActions.update
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
