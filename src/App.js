import React from 'react';
import { Amplify } from 'aws-amplify';
import AuctionPage from './pages/AuctionPage';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { Hub } from 'aws-amplify/utils';
import { generateClient } from 'aws-amplify/api';
import { listPlayers } from './graphql/queries';
import { createPlayer } from './graphql/mutations';
async function createNewPlayer(userId, username) {
  const data = {
    userId,
    nickname: username,
    money: 1000,
  };
  await client.graphql({
    query: createPlayer,
    variables: { input: data },
  });
}

const client = generateClient();

const listener = async (data) => {
  const playersData = await client.graphql({ query: listPlayers });
  const playersList = playersData.data.listPlayers.items
  const nicknames = playersList.map(pl => pl.nickname)
  const isNewUser = !nicknames.includes(data?.payload?.data?.nickname)
  if (!isNewUser && data.payload.event === "signedIn" && data?.payload?.data?.userId.length && data?.payload?.data?.username.length) {
    createNewPlayer(data?.payload?.data?.userId, data?.payload?.data?.username)
  }
};

Hub.listen('auth', listener);
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <AuctionPage/>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}