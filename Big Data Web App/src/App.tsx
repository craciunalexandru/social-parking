import * as React from 'react';
import { Provider } from "react-redux";
import ApplicationContainer from './features/specific/Application';
import store from './redux/configureStore';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <ApplicationContainer />
      </Provider>
    );
  }
}

export default App;
