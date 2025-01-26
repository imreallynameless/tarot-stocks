import React, { useEffect, useState } from 'react';
import QuestionBox from '../../components/QuestionBox'; // Import the QuestionBox component
import {Button1} from '../../constants/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'
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
    
    <MainSection>
      {error && <p>{error}</p>}
      <QuestionSection>
        {quizData.length > 0 ? (
          quizData.map((quizItem) => (
            <QuestionBox
              key={quizItem.id}
              question={quizItem.text}
            //   options={quizItem.options}
            //   id={quizItem.id}
            //   onSelectAnswer={handleSelectAnswer}
            />
          ))
        ) : (
          <p>No quiz data available.</p>
        )}
      </QuestionSection>
      <SubmitSection >
          <SubmitButton
            onClick={() =>
                navigate("/results")
            }>
            Submit Answers
          </SubmitButton>
      </SubmitSection>
      {showAnswers && (
        <div style={{ marginTop: '20px', textAlign: 'center', maxHeight: '40vh', overflowY: 'auto' }}>
          <h3>Selected Answers:</h3>
          <pre>{JSON.stringify(selectedAnswers, null, 2)}</pre>
        </div>
      )}
    </MainSection>
  );
};

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
`
const QuestionSection = styled.div`
    padding-botom: 10rem;
    padding-top: 5rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    height: 100vh;
`

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
`

const SubmitButton = styled.div`
background-image: linear-gradient(to bottom right, #44A2B1, #C15A93);
  overflow: hidden;
  position: relative;
  height: 22px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  font-family: Helvetica Now Display;
  font-size: 17px;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  ${(props) => props.className}

  span {
    z-index: 20;
  }

  &:after {
    background: #fff;
    content: "";
    height: 155px;
    left: -75px;
    opacity: .2;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
  }

  :hover {
    
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`

export default Mbti;