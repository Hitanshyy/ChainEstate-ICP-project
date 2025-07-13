import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { AnonymousIdentity } from '@dfinity/agent';
import { ChainEstate_backend } from 'declarations/ChainEstate_backend';

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
      const identity = authClient.getIdentity();
      setUserPrincipal(identity.getPrincipal().toText());
      ChainEstate_backend.agent.replaceIdentity(identity);
      setIsAuthenticated(true);
    } else {
      ChainEstate_backend.agent.replaceIdentity(new AnonymousIdentity());
    }
  }

  initAuth();
}, []);


  const login = async () => {
  if (!authClient) return;
  await authClient.login({
    identityProvider: "http://localhost:4943?canisterId=" + process.env.CANISTER_ID_INTERNET_IDENTITY,
    onSuccess: async () => {
      const identity = authClient.getIdentity();
      ChainEstate_backend.agent.replaceIdentity(identity);
      setUserPrincipal(identity.getPrincipal().toText());
      setIsAuthenticated(true);
    }
  });
};


  const logout = async () => {
    await authClient.logout();
    ChainEstate_backend.agent.replaceIdentity(new AnonymousIdentity());
    setIsAuthenticated(false);
    setUserPrincipal('');
    setGreeting('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements.name.value;
    try {
      const result = await ChainEstate_backend.greet(name);
      setGreeting(result);
    } catch (err) {
      console.error('Error calling greet:', err);
      setGreeting('❌ Failed to get greeting.');
    }
    setLoading(false);
    e.target.reset();
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {!isAuthenticated ? (
        <button onClick={login}>Login with Internet Identity</button>
      ) : (
        <>
          <div>
            Logged in as: <strong>{userPrincipal}</strong>
            <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
          </div>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <label>
              Your name: &nbsp;
              <input name="name" required />
            </label>
            <button type="submit" disabled={loading} style={{ marginLeft: '0.5rem' }}>
              {loading ? 'Loading...' : 'Greet Me'}
            </button>
          </form>
          {greeting && <p style={{ marginTop: '1rem' }}><strong>{greeting}</strong></p>}
        </>
      )}
    </main>
  );
}

export default App;
