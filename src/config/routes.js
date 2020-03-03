import React from 'react';

const Dashboard = React.lazy(() => import('pages/Dashboard/Dashboard')),
      User      = React.lazy(() => import('pages/User/User')),
      Carousel  = React.lazy(() => import('pages/Carousel/Carousel')),
      Service   = React.lazy(() => import('pages/Service/Service')),
      Gallery   = React.lazy(() => import('pages/Gallery/Gallery')),
      Testimony = React.lazy(() => import('pages/Testimony/Testimony')),
      Socmed    = React.lazy(() => import('pages/Socmed/Socmed')),
      Blog      = React.lazy(() => import('pages/Blog/Blog')),
      Header    = React.lazy(() => import('pages/Header/Header')),
      About     = React.lazy(() => import('pages/About/About')),
      Contact   = React.lazy(() => import('pages/Contact/Contact'));
    
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', name: 'User', component: User },
  { path: '/carousel', name: 'Carousel', component: Carousel },
  { path: '/service', name: 'Service', component: Service },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/testimony', name: 'Testimony', component: Testimony },
  { path: '/socmed', name: 'Socmed', component: Socmed },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/header', name: 'Header', component: Header },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact }
];

export default routes;
