from fastapi import FastAPI
import requests
from constants import *
import re
import requests
import base64
import json

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/get_quiz")
async def get_quiz():
    url = "https://www.16personalities.com/free-personality-test"
    res = requests.get(url)
    
    # Step 2: Extract the questions using a regex
    regex = re.compile(r':questions="(\[.*?\])"', re.DOTALL)
    matches = regex.search(res.text)

    if not matches:
        raise ValueError("No matches found")

    unparsed_questions = matches.group(1)

    # Step 3: Replace placeholders using the replace map
    replace_map = {
        "&quot;": '"',
        "&amp;": "&",
        # Add more replacements if needed
    }

    replaced_questions = unparsed_questions
    for key, value in replace_map.items():
        replaced_questions = replaced_questions.replace(key, value)

    # Parse the questions JSON
    questions = json.loads(replaced_questions)

    # Step 4: Define default options
    default_options = [
        {"text": "Disagree strongly", "value": -3},
        {"text": "Disagree moderately", "value": -2},
        {"text": "Disagree a little", "value": -1},
        {"text": "Neither agree nor disagree", "value": 0},
        {"text": "Agree a little", "value": 1},
        {"text": "Agree moderately", "value": 2},
        {"text": "Agree strongly", "value": 3},
    ]

    # Step 5: Format questions with options
    formatted_questions = [
        {
            "id": base64.urlsafe_b64encode(question["text"].encode()).decode(),
            "text": question["text"],
            "options": default_options,
        }
        for question in questions
    ]

    return formatted_questions