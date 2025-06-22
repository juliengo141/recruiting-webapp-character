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

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [skillPoints, setSkillPoints] = useState<Record<string, number>>({});

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

  const handleClassClick = (className: Class) => {
    setSelectedClass(selectedClass === className ? null : className);
  };

  const calculateAbilityModifier = (attributeValue: number): number => {
    return Math.floor((attributeValue - 10) / 2);
  };

  const getAvailableSkillPoints = (): number => {
    const intelligenceModifier = calculateAbilityModifier(attributes.Intelligence);
    return Math.max(0, 10 + (4 * intelligenceModifier));
  };

  const getUsedSkillPoints = (): number => {
    return Object.values(skillPoints).reduce((total, points) => total + points, 0);
  };

  const getRemainingSkillPoints = (): number => {
    return getAvailableSkillPoints() - getUsedSkillPoints();
  };

  const incrementSkillPoint = (skillName: string) => {
    if (getRemainingSkillPoints() > 0) {
      setSkillPoints((prev) => ({
        ...prev,
        [skillName]: (prev[skillName] || 0) + 1,
      }));
    }
  };

  const decrementSkillPoint = (skillName: string) => {
    setSkillPoints((prev) => ({
      ...prev,
      [skillName]: Math.max(0, (prev[skillName] || 0) - 1)
    }));
  };

  const getSkillTotal = (skillName: string): number => {
    const skill = SKILL_LIST.find((s) => s.name === skillName);
    if (!skill) {
      return 0;
    }
    const attributeModifier = calculateAbilityModifier(attributes[skill.attributeModifier as keyof Attributes]);
    const pointsAdded = skillPoints[skillName] || 0;
    return attributeModifier + pointsAdded;
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="App-grid">
          <div>
            <h2>Attributes</h2>
            <div>
              {Object.entries(attributes).map(([attribute, value]) => (
                <div key={attribute}>
                  <span>{attribute}: {value}</span>
                  <button className="clickable" onClick={() => incrementAttribute(attribute as keyof Attributes)}>+</button>
                  <button className="clickable" onClick={() => decrementAttribute(attribute as keyof Attributes)}>-</button>
                  <span> (Modifier: {calculateAbilityModifier(value)})</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>Classes</h2>
            <div>
              {Object.keys(CLASS_LIST).map((className) => (
                <div key={className}>
                  <span 
                    className={`${meetsClassRequirements(className as Class) ? 'class-available' : ''} clickable`}
                    onClick={() => handleClassClick(className as Class)}
                  >
                    {className}
                  </span>
                </div>
              ))}
            </div>
            {selectedClass && (
              <div>
                <h3>Minimum Requirements for {selectedClass}:</h3>
                {Object.entries(CLASS_LIST[selectedClass]).map(([attribute, minValue]) => (
                  <div key={attribute}>
                    {attribute}: {minValue}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2>Skills</h2>
            <div>
              <p>Available Points: {getRemainingSkillPoints()} / {getAvailableSkillPoints()}</p>
            </div>
            <div>
              {SKILL_LIST.map((skill) => (
                <div key={skill.name}>
                  <span>{skill.name}: {skillPoints[skill.name] || 0}</span>
                  <button 
                    className="clickable" 
                    onClick={() => incrementSkillPoint(skill.name)}
                    disabled={getRemainingSkillPoints() <= 0}
                  >
                    +
                  </button>
                  <button 
                    className="clickable" 
                    onClick={() => decrementSkillPoint(skill.name)}
                    disabled={(skillPoints[skill.name] || 0) <= 0}
                  >
                    -
                  </button>
                  <span> modifier({skill.attributeModifier}): {calculateAbilityModifier(attributes[skill.attributeModifier as keyof Attributes])}, </span>
                  <span> total: {getSkillTotal(skill.name)}</span>
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
