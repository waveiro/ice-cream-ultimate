import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMenuItem } from '../services/iceCream.service';

import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';

const EditIceCream = ({ match, history }) => {
  const isMounted = useRef(true);
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function _getMenuItem() {
      try {
        const { id, iceCream, price, description, inStock, quantity } = await getMenuItem(match.params.id);

        setMenuItem({
          id,
          price: price.toFixed(2),
          inStock,
          quantity: quantity.toString(),
          description,
          iceCream
        });
      } catch (e) {
        if (e.response.status === 404 && isMounted.current) {
          history.replace('/');
        }
      }
    }

    _getMenuItem();
  }, [match.params.id]);

  console.log(menuItem);

  return (
    <main>
      <Helmet>
        <title>Update this beauty | Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>

      <LoaderMessage loadingMessage="Loading ice cream" doneMessage="Ice cream loaded" isLoading={menuItem == null} />

      {JSON.stringify(menuItem)}
    </main>
  );
};

EditIceCream.propTypes = {
  params: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  })
};

export default EditIceCream;
