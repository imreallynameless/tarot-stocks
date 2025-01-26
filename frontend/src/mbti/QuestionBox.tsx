import React, { useState } from 'react';

interface Option {
  text: string;
  value: number;
}

interface QuestionBoxProps {
  question: string;
  options: Option[];
  id: string; // Unique identifier for the question
  onSelectAnswer: (id: string, value: number) => void; // Function to handle answer selection
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, options, id, onSelectAnswer }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedValue(value);
    onSelectAnswer(id, value); // Pass the selected value to the parent (App)
  };

  // Function to calculate the size of the circle based on its position
  const getCircleSize = (index: number) => {
    const middleIndex = 3; // Middle of the 7 circles (0-6)
    const distanceFromMiddle = Math.abs(index - middleIndex);
    const baseSize = 40; // Base size of the circle
    const sizeReduction = distanceFromMiddle * 5; // Reduce size based on distance from middle
    return baseSize + sizeReduction;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginBottom: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>{question}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span style={{ marginRight: '20px', fontWeight: 'bold' }}>Agree</span>
        {[...Array(7)].map((_, index) => {
          const circleSize = getCircleSize(index);
          const selectedSize = selectedValue === index ? circleSize : circleSize; // Grow selected circle
          return (
            <div
              key={index}
              onClick={() => handleCircleClick(index)}
              style={{
                width: `${selectedSize}px`,
                height: `${selectedSize}px`,
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
              {/* No number inside the circle */}
            </div>
          );
        })}
        <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Disagree</span>
      </div>
    </div>
  );
};

export default QuestionBox;
