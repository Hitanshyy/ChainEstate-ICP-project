import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { ChainEstate_backend } from 'declarations/ChainEstate_backend';
import { AnonymousIdentity } from '@dfinity/agent';

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPrincipal, setUserPrincipal] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initAuth() {
      const authClient = await AuthClient.create();
      setAuthClient(authClient);

      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
        const identity = authClient.getIdentity();
        setUserPrincipal(identity.getPrincipal().toText());
        ChainEstate_backend.agent.replaceIdentity(identity);
      } else {
        ChainEstate_backend.agent.replaceIdentity(new AnonymousIdentity());
      }
    }
    initAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;
    await authClient.login({
      onSuccess: () => {
        setIsAuthenticated(true);
        const identity = authClient.getIdentity();
        setUserPrincipal(identity.getPrincipal().toText());
        ChainEstate_backend.agent.replaceIdentity(identity);
      },
      identityProvider: 'https://identity.ic0.app', // Mainnet Internet Identity
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setUserPrincipal('');
    ChainEstate_backend.agent.replaceIdentity(new AnonymousIdentity());
    setGreeting('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const name = event.target.elements.name.value;
    try {
      const greeting = await ChainEstate_backend.greet(name);
      setGreeting(greeting);
      event.target.elements.name.value = ''; // clear input
    } catch (err) {
      console.error('Error calling greet:', err);
      setGreeting('Failed to get greeting. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {!isAuthenticated ? (
        <button onClick={login} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
          Login with Internet Identity
        </button>
      ) : (
        <>
          <div>
            Logged in as: <strong>{userPrincipal}</strong>{' '}
            <button onClick={logout} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: &nbsp;</label>
            <input id="name" type="text" required />
            <button type="submit" disabled={loading} style={{ marginLeft: '0.5rem' }}>
              {loading ? 'Loading...' : 'Click Me!'}
            </button>
          </form>
          <section id="greeting" style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            {greeting}
          </section>
        </>
      )}
    </main>
  );
}

export default App;
