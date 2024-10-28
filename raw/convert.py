import json
import glob

# Initialize an empty dictionary to store sessions and their questions
questions_dict = {}

# Loop through each file that matches the pattern 'ssX.txt'
for filename in sorted(glob.glob("ss*.txt")):
    session_name = filename.split('.')[0].replace("ss", "sesion")
    
    with open(filename, 'r', encoding='utf-8') as file:
        # Read the entire file content and split based on double newlines (blank lines)
        content = file.read().strip()
        questions = [question.replace("\n", " ") for question in content.split("\n\n") if question.strip()]
        
        # Add the questions list to the dictionary under the session key
        questions_dict[session_name] = questions

# Output the result to a JSON file
with open("questions_two.json", "w", encoding='utf-8') as json_file:
    json.dump(questions_dict, json_file, ensure_ascii=False, indent=4)

print("Questions have been successfully formatted and saved to questions.json.")
