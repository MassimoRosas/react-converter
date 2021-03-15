import React from 'react';
import PropTypes from 'prop-types';

import './amount.scss';

const Amount = ({ currency, amount }) => (
  <div className="amount">
    <p className="amount-value">{amount}</p>
    <p className="amount-currency">{currency}</p>
  </div>
);

Amount.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default Amount;
