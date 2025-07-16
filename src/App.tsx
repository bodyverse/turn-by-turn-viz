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
      <div className="bg-red-500 text-white p-4 text-xl">
        Tailwind is finally working! 🔥
      </div>
      <div className="bg-red-500 text-white p-4 text-xl">
        If this is red, Tailwind is working 🔥
      </div>
      <h1 className="p-6 text-2xl font-bold text-green-500">Dance Card DB Viewer</h1>

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
