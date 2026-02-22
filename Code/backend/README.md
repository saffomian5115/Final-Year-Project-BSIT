python -m venv venv

source venv/Scripts/activate   
uvicorn main:app --reload



push to github:
git add .
git commit -m "Initial commit"
git push -u origin main