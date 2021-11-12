
import React from 'react';
import Navigate from './src';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/store';

const App = () => {
  return (
        <Navigate />
  );
};

export default App;
