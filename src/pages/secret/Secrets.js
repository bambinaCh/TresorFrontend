import '../../App.css';
import React, { useEffect, useState } from 'react';
import { getSecretsforUser } from "../../comunication/FetchSecrets";

/**
 * Secrets
 * @author Peter Rutschmann
 */
const Secrets = ({ loginValues }) => {
    const [secrets, setSecrets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSecrets = async () => {
            setErrorMessage('');
            if (!loginValues.email) {
                console.error('Secrets: No valid email, please do login first:' + loginValues);
                setErrorMessage("No valid email, please do login first.");
            } else {
                try {
                    const data = await getSecretsforUser(loginValues);
                    console.log(data);
                    setSecrets(data);
                } catch (error) {
                    console.error('Failed to fetch to server:', error.message);
                    setErrorMessage(error.message);
                }
            }
        };
        fetchSecrets();
    }, [loginValues]);

    return (
        <>
            <h1>my secrets</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form>
                <h2>secrets</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Secret ID</th>
                            <th>User ID</th>
                            <th>Secret type</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secrets?.length > 0 ? (
                            secrets.map(secret => {
                                let content;
                                try {
                                    content = JSON.parse(secret.content);
                                } catch {
                                    content = { kind: "unknown" };
                                }

                                return (
                                    <tr key={secret.id} data-kind={content.kind}>
                                        <td>{secret.id}</td>
                                        <td>{secret.userId}</td>
                                        <td><strong>{content.kind}</strong></td>
                                        <td>
                                            {content.kind === "note" && (
                                                <>
                                                    Titel: {content.title}<br />
                                                    Inhalt: {content.content}
                                                </>
                                            )}
                                            {content.kind === "credential" && (
                                                <>
                                                    Benutzername: {content.userName}<br />
                                                    Passwort: {content.password}<br />
                                                    URL: {content.url}
                                                </>
                                            )}
                                            {content.kind === "creditcard" && (
                                                <>
                                                    Kartentyp: {content.cardtype}<br />
                                                    Nummer: {content.cardnumber}<br />
                                                    Ablauf: {content.expiration}<br />
                                                    CVV: {content.cvv}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No secrets available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </>
    );
};

export default Secrets;