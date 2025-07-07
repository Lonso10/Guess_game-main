from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Backend Flask funcionando!"

@app.route('/api/create', methods=['POST'])
def create_game():
    data = request.get_json()
    password = data.get('password', '')

    # Simula criação de game_id — aqui você coloca sua lógica real
    game_id = "game123"

    return jsonify({"game_id": game_id})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
