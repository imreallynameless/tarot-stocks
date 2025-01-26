import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Label1, Label2 } from '../constants/Labels'
import { Button1 } from '../constants/Buttons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { css, keyframes } from '@emotion/react'
import { PieChart } from '@mui/x-charts/PieChart';

interface PersonalityData {
    Explanation: string;
    RiskProfile: string;
    Allocation: {
        [key: string]: [number, string[]];
    };
}

interface InvestmentPieChartProps {
    personalityData: PersonalityData;
}


const ResultsPage: React.FC<InvestmentPieChartProps> = ({ personalityData }) => {
    const chartData = Object.entries(personalityData.Allocation).map(([label, [value, recommendations]], id) => ({
        id,
        value,
        label: `${label}: ${recommendations.join(", ")}`
    }));

    console.log(chartData)
    return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Take up full viewport height
            width: '100%', // Take up full viewport width
          }}
        >
          {/* Pie Chart Container */}
          <div
            style={{
              width: '50%', // Take up half the screen width
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PieChart
              series={[
                {
                  data: chartData,
                },
              ]}
              width={600} // Adjust width as needed
              height={300} // Adjust height as needed
              slotProps={{
                legend: {
                  hidden: true, // Hide the legend
                },
              }}
            />
          </div>
    
          {/* Risk Profile and Explanation */}
          <div
            style={{
              width: '50%', // Match the width of the pie chart
              textAlign: 'center', // Center-align text
              marginTop: '20px', // Add some spacing between the chart and text
              color: 'white', // Ensure text is white
            }}
          >
            <p>
              <strong>Risk Profile:</strong> {personalityData.RiskProfile}
            </p>
            <p>
              <strong>Explanation:</strong> {personalityData.Explanation}
            </p>
          </div>
        </div>
      );
};


export default ResultsPage