import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row
} from 'reactstrap'; 
import { connect } from 'react-redux';
import { DefaultTable } from 'components';
import { loadTableActions } from 'stores';
import Add from './Add';
import Delete from './Delete';
import Edit from './Edit';
import Detail from './Detail';
import { ControlledAlert } from 'components';
import { dateToString } from 'helpers';

const columns = [
  {
   name: 'No',
   selector: 'index',
   sortable: true, 
   width: '100px'
  },
  {
    name: 'Username',
    selector: 'username',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true
  },
  {
    name: 'Date Created',
    selector: 'created_at',
    sortable: true,
    format: row => dateToString(row.createdAt)
  },
]

class User extends React.Component {

  componentDidMount() {
    this.props.getAll('/user')
  }

  render(){ 
    const { data, alert } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>
                <i className="fa fa-user"></i> User
                </h5>
              </CardHeader>
              <CardBody>
                <ControlledAlert message={alert.message} color={alert.color} visible={alert.visible} timeout={ 5000 } />
                <DefaultTable 
                  columns={ columns }
                  actionButton={ true }
                  data={ data }
                  loading={ data.loading }
                  context="User"
                  filteredColumns={["username", "email"]}
                  actionContent={["add", "delete", "detail", "edit"]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Add />
        <Detail />
        <Delete />
        <Edit />
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.loadTable,
    alert: state.alert
  }
}

const mapDispatchToProps = {
  getAll: loadTableActions.getAll
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
