import requests

BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_exams():
    # Login
    login_data = {
        "email": "dr.kamran@bzu.edu.pk",
        "password": "Teacher@123"
    }
    print("Logging in...")
    try:
        resp = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        resp.raise_for_status()
        token = resp.json()["data"]["access_token"]
        print("Login successful.")
        
        # Test exams endpoint
        headers = {"Authorization": f"Bearer {token}"}
        print(f"Testing GET /offerings/1/exams ...")
        # I'll try offering ID 1 or 4 or whatever exists
        resp = requests.get(f"{BASE_URL}/offerings/4/exams", headers=headers)
        print(f"Status: {resp.status_code}")
        print(f"Response: {resp.text}")
        
    except Exception as e:
        print(f"Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response text: {e.response.text}")

if __name__ == "__main__":
    test_exams()
