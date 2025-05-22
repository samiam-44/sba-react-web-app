import React, { useState } from 'react';

export default function Carousel({ children }) {
  const [index, setIndex] = useState(0);
  const total = React.Children.count(children);

  const prev = () => setIndex(index === 0 ? total - 1 : index - 1);
  const next = () => setIndex(index === total - 1 ? 0 : index + 1);

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          width: `${total * 100}%`,
          transform: `translateX(-${index * (100 / total)}%)`,
          transition: 'transform 0.4s ease',
        }}
      >
        {React.Children.map(children, (child) => (
          <div style={{ flex: `0 0 ${100 / total}%` }}>
            {child}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <button onClick={prev} style={{ marginRight: 10 }}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}


