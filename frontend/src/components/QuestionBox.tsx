import React, { useState } from 'react';

interface QuestionBoxProps {
  id: string; // Unique identifier for the question
  question: string;
  onSelectAnswer: (id: string, value: number) => void; // Callback function to update state in parent
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ id, question, onSelectAnswer }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleCircleClick = (value: number) => {
    setSelectedValue(value);
    onSelectAnswer(id, value); // Notify the parent of the selected value
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
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: 'white' }}>{question}</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span style={{ marginRight: '20px', fontWeight: 'bold', color: 'white' }}>Disagree</span>
        {[...Array(7)].map((_, index) => {
          const circleSize = getCircleSize(index);
          return (
            <div
              key={index}
              onClick={() => handleCircleClick(index - 3)} // Convert index to range [-3, 3]
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
                borderRadius: '50%',
                border: '2px solid #000',
                backgroundColor: selectedValue === index - 3 ? '#007bff' : '#fff',
                color: selectedValue === index - 3 ? '#fff' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'width 0.3s, height 0.3s, background-color 0.3s, color 0.3s',
              }}
            ></div>
          );
        })}
        <span style={{ marginLeft: '20px', fontWeight: 'bold', color: 'white' }}>Agree</span>
      </div>
    </div>
  );
};

export default QuestionBox;
