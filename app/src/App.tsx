import type { Component } from 'solid-js';
import { canton, getNewCanton, getCurrentLevel } from './store'
import QuestionGeo from './components/QuestionNeighbors';

const App: Component = () => {
  return (
    <div>
      <QuestionGeo />
      <pre>{JSON.stringify(canton, null, 2)}</pre>
    </div>
  );
};

export default App;
