from flask import Flask, jsonify
from app import create_app

app = create_app()

def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.json == {'message': 'Welcome to the API!'}

def test_about(client):
    response = client.get('/about')
    assert response.status_code == 200
    assert response.json == {'message': 'About this API'}

def test_not_found(client):
    response = client.get('/non-existent-route')
    assert response.status_code == 404
    assert response.json == {'error': 'Not Found'}