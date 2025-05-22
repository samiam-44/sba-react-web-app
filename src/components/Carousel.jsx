import React, { useState } from 'react';

export default function Carousel({ children }) {
  const [index, setIndex] = useState(0);
  const total = React.Children.count(children);

  const prev = () => setIndex(index === 0 ? total - 1 : index - 1);
  const next = () => setIndex(index === total - 1 ? 0 : index + 1);

  return (
    <div class= 'carousel-controls' style={{ width: '50%', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          width: `${total * 100}%`,
          transform: `translateX(-${index * (100 / total)}%)`,
          transition: 'transform 0.4s ease',
        }}
      >
        {React.Children.map(children, (child) => (
          <div>
            {child}
          </div>
        ))}
      </div>
      <div id='carouselButton'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}


