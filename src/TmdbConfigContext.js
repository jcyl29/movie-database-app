import React, { createContext } from 'react';
import { PropTypes } from 'prop-types';

const TmdbConfigContext = createContext();

export const TmdbConfigProvider = ({ config, children }) => {
  const context = {
    config
  };

  return (
    <TmdbConfigContext.Provider value={context}>
      {children}
    </TmdbConfigContext.Provider>
  );
};
TmdbConfigProvider.defaultProps = {
  children: null,
  config: null
};
TmdbConfigProvider.propTypes = {
  config: PropTypes.shape({}),
  children: PropTypes.node
};

export const TmdbConfigConsumer = TmdbConfigContext.Consumer;
export default TmdbConfigContext;
