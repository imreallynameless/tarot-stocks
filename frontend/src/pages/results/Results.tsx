import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import styled from '@emotion/styled';

interface PersonalityData {
  Explanation: string;
  RiskProfile: string;
  Allocation: {
    [key: string]: [number, string[]];
  };
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const personalityData = location.state?.personalityData as PersonalityData;

  // Redirect to the quiz if no data is present
  if (!personalityData) {
    console.warn('No data passed to Results page. Redirecting to quiz...');
    navigate('/mbti'); // Redirect to /mbti
    return null; // Avoid rendering anything while redirecting
  }

  // Transform allocation data for the chart
  const chartData = Object.entries(personalityData.Allocation).map(([label, [value, recommendations]], id) => ({
    id,
    value,
    label: `${label}: ${recommendations.join(', ')}`,
  }));

  return (
    <ResultsContainer>
      <Heading>Results</Heading>
      <TextSection>
        <RiskProfile>
          <strong>Risk Profile:</strong> {personalityData.RiskProfile}
        </RiskProfile>
        <Explanation>
          <strong>Explanation:</strong> {personalityData.Explanation}
        </Explanation>
      </TextSection>
      <ChartContainer>
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={600}
          height={300}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </ChartContainer>
    </ResultsContainer>
  );
};

export default Results;

// Styled Components
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #44a2b1;
`;

const TextSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RiskProfile = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Explanation = styled.p`
  font-size: 1rem;
`;

const ChartContainer = styled.div`
  margin-top: 2rem;
`;
