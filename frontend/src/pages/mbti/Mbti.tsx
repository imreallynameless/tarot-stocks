import React, { useEffect, useState } from 'react';
import QuestionBox from '../../components/QuestionBox'; // Import the QuestionBox component

type Option = {
  text: string;
  value: number;
};

type QuizItem = {
  id: string;
  text: string;
  options: Option[];
};

const App: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number | null }>({});
  const [showAnswers, setShowAnswers] = useState(false); // To toggle the display of answers

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true); // Set loading to true before making the request
        const response = await fetch('http://127.0.0.1:8000/get_quiz');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError('Error fetching quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleSelectAnswer = (id: string, value: number) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    setShowAnswers(true); // Show the answers when the button is clicked
  };

  const allAnswered = quizData.every((quizItem) => selectedAnswers[quizItem.id] !== null);

  if (loading) {
    return <div>Loading quiz...</div>; // Show loading message
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px' }}>
      {error && <p>{error}</p>}
      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {quizData.length > 0 ? (
          quizData.map((quizItem) => (
            <QuestionBox
              key={quizItem.id}
              question={quizItem.text}
              options={quizItem.options}
              id={quizItem.id}
              onSelectAnswer={handleSelectAnswer}
            />
          ))
        ) : (
          <p>No quiz data available.</p>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered} // Disable button until all questions are answered
          style={{
            padding: '10px 20px',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: allAnswered ? '#007bff' : '#ccc',
            color: '#fff',
          }}
        >
          Submit Answers
        </button>
      </div>
      {showAnswers && (
        <div style={{ marginTop: '20px', textAlign: 'center', maxHeight: '40vh', overflowY: 'auto' }}>
          <h3>Selected Answers:</h3>
          <pre>{JSON.stringify(selectedAnswers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;