import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

function setTitle(title) {
    document.title = `${title} | Brastlewark | City`;
}

const RouteElement = ({ exact, path, activePath, title, helpPage, component: Component, ...rest }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => {
      setTitle(title);
      return <Component {...props} {...rest} />;
    }}
  />
);

RouteElement.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

RouteElement.defaultProps = {
  exact: false,
};

export default RouteElement;
