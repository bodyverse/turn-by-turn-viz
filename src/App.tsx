import { useEffect, useState } from 'react';
import { fetchSheet } from './utils/fetchSheet';

function App() {
  const [cards, setCards] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    (async () => {
      const cardData = await fetchSheet<Record<string, any>>('Moves');
      setCards(cardData);
    })();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dance Card DB Viewer</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              width: '100%',
              background: '#000',
            }}
          >
            {Object.entries(card).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
