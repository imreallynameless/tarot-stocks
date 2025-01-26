import React, { useState } from 'react';

interface QuestionBoxProps {
  question: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>{question}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span style={{ marginRight: '20px', fontWeight: 'bold' }}>Agree</span>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleCircleClick(index)}
            style={{
              width: selectedValue === index ? '50px' : '40px',
              height: selectedValue === index ? '50px' : '40px',
              borderRadius: '50%',
              border: '2px solid #000',
              backgroundColor: selectedValue === index ? '#007bff' : '#fff',
              color: selectedValue === index ? '#fff' : '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'width 0.3s, height 0.3s, background-color 0.3s, color 0.3s',
            }}
          >
            {index}
          </div>
        ))}
        <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Disagree</span>
      </div>
    </div>
  );
};

export default QuestionBox;