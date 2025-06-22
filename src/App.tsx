import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import type { Attributes, Class } from './types';


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

  const meetsClassRequirements = (className: Class): boolean => {
    const classRequirements = CLASS_LIST[className];
    return Object.entries(classRequirements).every(([attribute, minValue]) => {
      return attributes[attribute as keyof Attributes] >= minValue;
    });
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <h2>Attributes</h2>
          <div>
            {Object.entries(attributes).map(([attribute, value]) => (
              <div key={attribute}>
                <span>{attribute}: {value}</span>
                <button onClick={() => incrementAttribute(attribute as keyof Attributes)}>+</button>
                <button onClick={() => decrementAttribute(attribute as keyof Attributes)}>-</button>
              </div>
            ))}
          </div>
          <div>
            <h2>Classes</h2>
            <div>
              {Object.keys(CLASS_LIST).map((className) => (
                <div key={className}>
                  <span className={meetsClassRequirements(className as Class) ? 'class-available' : ''}>
                    {className}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
