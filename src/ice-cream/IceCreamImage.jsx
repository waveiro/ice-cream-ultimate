import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ iceCreamId }) => {
  return (
    iceCreamId != null && <img src={`/ice-cream-images/ice-cream-${iceCreamId}.svg`} alt="" />
  );
};

IceCreamImage.propTypes = {
  iceCreamId: PropTypes.number.isRequired
};

export default IceCreamImage;
