import React from 'react';
import PropTypes from 'prop-types';

import './customButton.scss';

const CustomButton = ({ open, manageClick }) => {
  let className = 'custom-button';
  if (open) {
    className += ' custom-button--open';
  }

  // événements React
  // https://fr.reactjs.org/docs/events.html

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        manageClick(!open);
      }}
    >
      =
    </button>
  );
};

CustomButton.propTypes = {
  open: PropTypes.bool.isRequired,
  manageClick: PropTypes.func.isRequired,
};

export default CustomButton;
