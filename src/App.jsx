import Rutas from './routes'
import { Provider } from 'react-redux'
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Rutas />
      </Provider>
    </div>
  );
}

export default App;
