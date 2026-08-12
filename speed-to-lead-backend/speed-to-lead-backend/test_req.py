import requests

res = requests.post("http://localhost:8000/webhook/lead", json={
    "name": "Test User",
    "contact": "test@example.com",
    "source": "web_form"
})

print(res.status_code)
print(res.text)
