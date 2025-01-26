from fastapi import FastAPI, HTTPException
import requests
import re
import base64
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import results

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow communication with frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],  # Replace with your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model to accept answers in POST request
class Answers(BaseModel):
    answers: dict

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/get_quiz")
async def get_quiz():
    try:
        # Step 1: Fetch the quiz from the website
        url = "https://www.16personalities.com/free-personality-test"
        res = requests.get(url)

        # Step 2: Extract the questions using regex
        regex = re.compile(r':questions="(\[.*?\])"', re.DOTALL)
        matches = regex.search(res.text)

        if not matches:
            raise HTTPException(status_code=500, detail="No matches found in the quiz source")

        unparsed_questions = matches.group(1)

        # Step 3: Replace placeholders in the extracted JSON
        replace_map = {
            "&quot;": '"',
            "&amp;": "&",
            # Add more replacements if needed
        }
        replaced_questions = unparsed_questions
        for key, value in replace_map.items():
            replaced_questions = replaced_questions.replace(key, value)

        # Step 4: Parse questions into JSON
        questions = json.loads(replaced_questions)

        # Step 5: Define default options
        default_options = [
            {"text": "Disagree strongly", "value": -3},
            {"text": "Disagree moderately", "value": -2},
            {"text": "Disagree a little", "value": -1},
            {"text": "Neither agree nor disagree", "value": 0},
            {"text": "Agree a little", "value": 1},
            {"text": "Agree moderately", "value": 2},
            {"text": "Agree strongly", "value": 3},
        ]

        # Step 6: Format questions with options
        formatted_questions = [
            {
                "id": base64.urlsafe_b64encode(question["text"].encode()).decode(),
                "text": question["text"],
                "options": default_options,
            }
            for question in questions
        ]

        return formatted_questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching the quiz: {str(e)}")

@app.post("/get_results")
async def get_results(answers: Answers):
    try:
        E, S, T, J = 0, 0, 0, 0

        for question_key, response in answers.answers.items():
            if question_key not in results.RESULT:
                raise ValueError(f"Invalid question key: {question_key}")
            
            action = results.RESULT[question_key]

            if action[0] == '-':
                response = -response

            if action[1] == 'e':
                E += response
            elif action[1] == 's':
                S += response
            elif action[1] == 't':
                T += response
            elif action[1] == 'j':
                J += response

        # Return the appropriate investment profile
        profile = results.INVESTMENT_PROFILES.get((E, S, T, J), results.INVESTMENT_PROFILES[(5, 1, 3, 4)])
        return profile

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
