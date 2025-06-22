import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import type { Attributes } from './types';


function App() {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  const incrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };
  
  const decrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] - 1,
    }));
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <h2>Character Attributes</h2>
          <div>
            {Object.entries(attributes).map(([attribute, value]) => (
              <div key={attribute}>
                <span>{attribute}: {value}</span>
                <button onClick={() => incrementAttribute(attribute as keyof Attributes)}>+</button>
                <button onClick={() => decrementAttribute(attribute as keyof Attributes)}>-</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
