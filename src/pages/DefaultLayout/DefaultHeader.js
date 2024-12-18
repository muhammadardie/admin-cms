import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { AppNavbarBrand, AppSidebarToggler, AppSwitch } from '@coreui/react';
import sygnet from '../../assets/img/brand/sygnet.svg'
import { connect } from 'react-redux';
import { themeActions } from 'stores';
import { images } from 'helpers';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    navigate: false,
    username: ''
  }

  componentDidMount() {
    let token = JSON.parse(localStorage.getItem('token'));
    this.setState({ username: token.data.username }) 
  }

  handleLogout = () => {
    localStorage.clear('token')
    this.setState({ navigate: true}) 
  }

  render() {
    const { navigate, username } = this.state;
    const { theme, setTheme } = this.props;
    
    if(navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: images.logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none" style={{ marginRight: 30 }}>
            <span>
              <AppSwitch className={'mx-1'} variant={'pill'} color={'info'} checked={ theme === 'dark' } onChange={(event) => event.target.checked ? setTheme('dark') : setTheme('light') } />
              <span style={{ color: '#fff' }}>Dark Mode</span>
            </span>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={ images.avatar } className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right className={"dropdown-" + theme}>
              <DropdownItem header tag="div" className="text-center"><strong>{ username }</strong></DropdownItem>
              <DropdownItem onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    theme: state.theme.theme
  }
}

const mapDispatchToProps = {
  setTheme: themeActions.setTheme
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader)
