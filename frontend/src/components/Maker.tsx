import React, { useState, ChangeEvent, FormEvent } from 'react';

const Maker: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [gameId, setGameId] = useState<string>('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5s

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
                signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();
            setGameId(data.game_id);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error creating game:', error.message);

                if (error.name === 'AbortError') {
                    console.error('Fetch aborted due to timeout');
                }
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <h1>Create a New Game</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Password:
                    <input name="passcode" type="text" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Create Game</button>
            </form>
            {gameId && <p>Game ID: {gameId}</p>}
        </div>
    );
};

export default Maker;
