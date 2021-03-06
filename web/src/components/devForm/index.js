import { React, useState, useEffect } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 3000,
            }
        )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="inputBlock">
                <label htmlFor="username_github">Usuário do Github</label>
                <input
                    type="text"
                    name="github_username"
                    id="username_github"
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                    required
                />
            </div>

            <div className="inputBlock">
                <label htmlFor="tecnologias">Tecnologias</label>
                <input
                    type="text"
                    name="techs"
                    id="techs"
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                    required
                />
            </div>

            <div className="inputGroup">
                <div className="inputBlock">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required
                    />
                </div>
                <div className="inputBlock">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;