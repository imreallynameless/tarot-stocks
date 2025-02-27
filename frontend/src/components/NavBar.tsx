import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Label1, Label2 } from '../constants/Labels'
import { Button1 } from '../constants/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { css, keyframes } from '@emotion/react'
const NavBar = () => {
  const navigate = useNavigate();
  const [ hoveredTab, setHoveredTab] = useState(0);
  return (
    <OuterCountainer>
      <NavBarContainer onMouseLeave={() => setHoveredTab(0)}>
        <NavBarSubContainer>
          <Link 
            to={"/"} 
            className='link' 
            onMouseOver={() => setHoveredTab(1)}
          >
            <Label2 className='cursor: pointer;'>
              Home
            </Label2>
          </Link>
          <Link 
            to={"/mbti"} 
            className='link' 
            onMouseOver={() => setHoveredTab(2)}
          >
            <Label2 className='cursor: pointer;'>
              Personality Test
            </Label2>
          </Link>
        </NavBarSubContainer>

        <Label1 
          className="margin-left: 7rem; margin-right: 7rem; color: rgba(255, 255, 255, 0.95); cursor: pointer;" 
          onClick={() => navigate("/")}
        >
            investology.
        </Label1>

        <NavBarSubContainer>
          <Button1 className='justify-self: end; cursor: pointer;'
          onClick={() =>
            navigate("/mbti")
          }>
            MBTI
          </Button1>
        </NavBarSubContainer>
        <div></div>
      </NavBarContainer>
    </OuterCountainer>
  )
}

const OuterCountainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;

`
const NavBarContainer = styled.div`
  height: 5rem;
  width: 70vw;
  min-width: 1200px;
  margin: 20px;
  margin-top: 30px;
  background-color: rgba(88, 88, 88, 0.2);
  display: flex; 
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  justify-self: center;
  backdrop-filter: blur(10px);
  .hide {
    display: none;
  }
  .link {
    text-decoration: none;
  }
`


const NavBarSubContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-evenly;
  justify-self: start;
  z-index: 2;
`;

export default NavBar