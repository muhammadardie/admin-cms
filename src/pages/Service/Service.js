import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row
} from 'reactstrap'; 
import { connect } from 'react-redux';
import { loadTableActions } from 'stores';
import Add from './Add';
import Delete from './Delete';
import Edit from './Edit';
import Detail from './Detail';
import { DefaultTable } from 'components';
import { dateToString, textLimit } from 'helpers';

const columns = [
  {
   name: 'No',
   selector: 'index',
   sortable: true, 
   width: '100px'
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'icon',
    selector: 'icon',
    sortable: true,
    format: row => <h3><span className={row.icon}></span></h3>
  },
  {
    name: 'Description',
    selector: 'desc',
    cell: row => textLimit(row.desc)
  },
  {
    name: 'Date Created',
    selector: 'created_at',
    sortable: true,
    format: row => dateToString(row.createdAt)
  },
]

class Service extends React.Component {

  componentDidMount() {
    this.props.getAll('/services')
  }

  render(){ 
    const { data, theme } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className={ 'card-' + theme }>
              <CardHeader>
                <h5>
                <i className="fa fa-check"></i> Service
                </h5>
              </CardHeader>
              <CardBody>
                <DefaultTable 
                  columns={ columns }
                  actionButton={ true }
                  data={ data }
                  loading={ data.loading }
                  context="Service"
                  filteredColumns={["title"]}
                  actionContent={["add", "delete", "detail", "edit"]}
                  responsive={false}
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
    theme: state.theme.theme
  }
}

const mapDispatchToProps = {
  getAll: loadTableActions.getAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Service)
