from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, Namespace

import requests
import json

app = Flask(__name__)
CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")


# Regular HTTP routes

# Singleplayer

@app.route('/singleplayer/<string>', methods=['GET'])
def proxy_singleplayer(string):
    target_url = f'http://localhost:8080/singleplayer/{string}'

    try:
        response = requests.get(target_url)
        return response.content, response.status_code, response.headers.items()
    except requests.RequestException as e:
        return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

@app.route('/categories/<string>', methods=['GET'])
def proxy_categories(string):
    target_url = f'http://localhost:8080/categories/{string}'
    
    try:
        response = requests.get(target_url)
        return response.content, response.status_code, response.headers.items()
    except requests.RequestException as e:
        return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

@app.route('/questions/1/<string>', methods=['GET'])
def proxy_questions_1(string):
    target_url = f'http://localhost:8080/questions/1/{string}'
    
    try:
        response = requests.get(target_url)
        return response.content, response.status_code, response.headers.items()
    except requests.RequestException as e:
        return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500
    
@app.route('/questions/2/<string>', methods=['GET'])
def proxy_questions_2(string):
    target_url = f'http://localhost:8080/questions/2/{string}'
    
    try:
        response = requests.get(target_url)
        return response.content, response.status_code, response.headers.items()
    except requests.RequestException as e:
        return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500


# End of Singleplayer

# Multiplayer
    
# Routes

# @app.route('/multiplayer/create', methods=['POST'])
# def proxy_multiplayer_create():
#     target_url = 'http://localhost:8080/multiplayer/create'
    
#     try:
#         response = requests.post(target_url, data=request.get_data(), headers=request.headers)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/turn/changeTurn/<string>', methods=['GET'])
# def proxy_change_turn_multiplayer(string):
#     target_url = f'http://localhost:8080/multiplayer/turn/changeTurn/{string}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/questions/1/<string>', methods=['GET'])
# def proxy_questions_1_multiplayer(string):
#     target_url = f'http://localhost:8080/multiplayer/questions/1/{string}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/questions/2/<string>', methods=['GET'])
# def proxy_questions_2_multiplayer(string):
#     target_url = f'http://localhost:8080/multiplayer/questions/2/{string}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# app.route('/multiplayer/categories/<cat>', methods=['GET'])
# def proxy_categories_multiplayer(cat):
#     target_url = f'http://localhost:8080/multiplayer/categories/{cat}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/score/1/<string>/<player>', methods=['GET'])
# def proxy_score_1_multiplayer(room_id, player):
#     target_url = f'http://localhost:8080/multiplayer/score/1/{room_id}/{player}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/score/2/<string>/<player>', methods=['GET'])
# def proxy_score_2_multiplayer(room_id, player):
#     target_url = f'http://localhost:8080/multiplayer/score/2/{room_id}/{player}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/score/<string>/<player>', methods=['POST'])
# def proxy_score_multiplayer(room_id, player):
#     target_url = f'http://localhost:8080/multiplayer/score/{room_id}/{player}'
    
#     try:
#         response = requests.post(target_url, data=request.get_data(), headers=request.headers)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/question/1/<string>', methods=['POST'])
# def proxy_question_1_multiplayer(room_id):
#     target_url = f'http://localhost:8080/multiplayer/question/1/{room_id}'
    
#     try:
#         response = requests.post(target_url, data=request.get_data(), headers=request.headers)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/question/2/<string>', methods=['POST'])
# def proxy_question_2_multiplayer(room_id):
#     target_url = f'http://localhost:8080/multiplayer/question/2/{room_id}'
    
#     try:
#         response = requests.post(target_url, data=request.get_data(), headers=request.headers)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500

# @app.route('/multiplayer/finish/<string>', methods=['GET'])
# def proxy_finish_multiplayer(room_id):
#     target_url = f'http://localhost:8080/multiplayer/finish/{room_id}'
    
#     try:
#         response = requests.get(target_url)
#         return response.content, response.status_code, response.headers.items()
#     except requests.RequestException as e:
#         return jsonify({'error': f'Request to target server failed: {str(e)}'}), 500


# End of Routes

# Sockets

# Define the Crow server WebSocket URL
# CROW_WS_URL = "ws://localhost:8080"

# # Create a single SocketIO namespace
# socketio.on_namespace(Namespace('/ws'))

# # Forward WebSocket connections from clients to the Crow server
# @socketio.on('connect', namespace='/ws')
# def handle_connect_ws():
#     namespace = request.namespace
#     response = requests.get(f"{CROW_WS_URL}{namespace}", headers=request.headers)
#     socketio.emit('connect_response', {'data': response.text, 'namespace': namespace}, namespace='/ws')

# # Forward WebSocket messages from clients to the Crow server
# @socketio.on('message', namespace='/ws')
# def handle_message_ws(data):
#     namespace = request.namespace
#     route = data.get('route', '')  # Assuming the route is included in the message
#     if route == '/ws/startgame':
#         response = requests.post(f"{CROW_WS_URL}/ws/startgame", data=data, headers=request.headers)
#     elif route == '/ws/turn':
#         response = requests.post(f"{CROW_WS_URL}/ws/turn", data=data, headers=request.headers)
#     else:
#         response = requests.post(f"{CROW_WS_URL}/ws", data=data, headers=request.headers)

#     socketio.emit('message_response', {'data': response.text, 'namespace': namespace}, namespace='/ws')


# End of Sockets

# End of Multiplayer



if __name__ == '__main__':
    app.run(debug=True, port=5000)
