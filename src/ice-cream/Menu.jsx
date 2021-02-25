import React, { useState, useEffect } from 'react';

import { getMenu } from '../services/iceCream.service';
import { Helmet } from 'react-helmet';
import IceCreamImage from './IceCreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    let isMounted = true;

    const menuData = await getMenu();

    if (isMounted) {
      setMenu(menuData);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const onItemClickHandler = to => {
    history.push(to);
  };

  const onLinkClickHandler = e => {
    e.stopPropagation();
  };

  return (
    <main>
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>

      <LoaderMessage loadingMessage="Loading menu..." doneMessage="Loading menu complete!" isLoading={isLoading} />

      {menu.length > 0 ?
        <ul className="container">
          {menu.map(({ id, iceCream, price, description, inStock, quantity }) => <li key={id.toString()}>
            <section className="card" onClick={() => {
              onItemClickHandler(`/menu-items/${id.toString()}`);
            }}>
              <div className="image-container">
                <IceCreamImage iceCreamId={iceCream.id} />
              </div>
              <div className="text-container">
                <h3><Link to={`/menu-items/${id.toString()}`} onClick={onLinkClickHandler}>{iceCream.name}</Link></h3>
                <div className="content card-content">
                  <p className="price">
                    {`$${price.toFixed(2)}`}
                  </p>
                  <p className={`stock${inStock ? '' : ' out'}`}>
                    {
                      inStock ? `${quantity} in stock` : 'Currently out of stock'
                    }
                  </p>

                  <p className="description">
                    {description}
                  </p>
                </div>
              </div>
            </section>
          </li>)}
        </ul> :
        !isLoading && <p>No options are available currently.</p>}
    </main>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default Menu;
