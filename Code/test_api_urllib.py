import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_api():
    # Login
    login_data = json.dumps({
        "email": "dr.kamran@bzu.edu.pk",
        "password": "Teacher@123"
    }).encode('utf-8')
    
    print("Logging in...")
    req = urllib.request.Request(f"{BASE_URL}/auth/login", data=login_data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode())
            token = res_data["data"]["access_token"]
            print("Login successful.")
            
            # Test exams
            headers = {"Authorization": f"Bearer {token}"}
            for path in ["/offerings/4/exams", "/offerings/4/sessions"]:
                print(f"Testing GET {path} ...")
                req_path = urllib.request.Request(f"{BASE_URL}{path}", headers=headers)
                try:
                    with urllib.request.urlopen(req_path) as resp:
                        content = resp.read().decode()
                        print(f"Status: {resp.status} - Length: {len(content)}")
                        # print(content[:200])
                except urllib.error.HTTPError as e:
                    print(f"HTTP Error {e.code}: {e.read().decode()}")
                except Exception as e:
                    print(f"Error testing {path}: {e}")
                    
    except Exception as e:
        print(f"Login failed: {e}")

if __name__ == "__main__":
    test_api()
