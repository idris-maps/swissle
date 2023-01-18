import type { Component } from 'solid-js';
import { canton, getNewCanton } from './store'
import Map from './Map'

const App: Component = () => {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={getNewCanton}>go</button>
      <div style="width:50vh">
        <Map canton={canton} />
      </div>
      <pre>{JSON.stringify(canton, null, 2)}</pre>
    </div>
  );
};

export default App;
