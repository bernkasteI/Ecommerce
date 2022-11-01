import React from 'react';
import Header from './../components/Header';
import { withRouter } from 'react-router';

const HomepageLayout = props => {
  return (
    <div className = "fullHeight">
        <Header/>
            {props.children}
    </div>
  );
};

export default HomepageLayout;