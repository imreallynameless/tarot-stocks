import React, { useEffect, useState } from 'react';
import QuestionBox from '../../components/QuestionBox'; // Import the QuestionBox component
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

type Option = {
  text: string;
  value: number;
};

type QuizItem = {
  id: string;
  text: string;
  options: Option[];
};

const Mbti: React.FC = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number | null }>({});

  // Fetch quiz data on component mount
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

  // Handle answer selection for each question
  const handleSelectAnswer = (id: string, value: number) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [id]: value };
      console.log('Updated selectedAnswers:', updatedAnswers); // Debugging
      return updatedAnswers;
    });
  };

  // Submit answers and navigate to the results page
  const handleSubmit = async () => {
    // Extract only answered questions
    const answeredQuestions = Object.entries(selectedAnswers).filter(
      ([, value]) => value !== null
    );

    if (answeredQuestions.length === 0) {
      alert('Please answer at least one question before submitting.');
      return;
    }

    console.log('Selected answers for submission:', selectedAnswers); // Debugging

    try {
      const response = await fetch('http://127.0.0.1:8000/get_results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: selectedAnswers }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      console.log('Backend response:', data); // Debugging

      // Save results to local storage for persistence
      localStorage.setItem('personalityData', JSON.stringify(data));

      // Navigate to results page with data
      navigate('/results', { state: { personalityData: data } });
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  // Render a loading state while fetching quiz data
  if (loading) {
    return <div>Loading quiz...</div>;
  }

  // Render the component
  return (
    <MainSection>
      {error && <p>{error}</p>}
      <QuestionSection>
        {quizData.length > 0 ? (
          quizData.map((quizItem) => (
            <QuestionBox
              key={quizItem.id}
              id={quizItem.id}
              question={quizItem.text}
              onSelectAnswer={handleSelectAnswer}
            />
          ))
        ) : (
          <p>No quiz data available.</p>
        )}
      </QuestionSection>
      <SubmitSection>
        <SubmitButton onClick={handleSubmit}>Submit Answers</SubmitButton>
      </SubmitSection>
    </MainSection>
  );
};

export default Mbti;

// Styled Components
const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const QuestionSection = styled.div`
  padding-bottom: 10rem;
  padding-top: 5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SubmitSection = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-top: 30px;
  padding-bottom: 30px;
  height: 50px;
  background-color: rgb(40, 40, 40);
`;

const SubmitButton = styled.button`
  background-image: linear-gradient(to bottom right, #44a2b1, #c15a93);
  overflow: hidden;
  position: relative;
  height: 40px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-family: Helvetica Now Display;
  font-size: 17px;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 30px;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;
