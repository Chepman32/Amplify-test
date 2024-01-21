// App.js
import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import AuctionPage from "./pages/AuctionPage";
import CustomHeader from "./components/CustomHeader";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { Hub } from "aws-amplify/utils";
import { generateClient } from "aws-amplify/api";
import { listPlayers } from "./graphql/queries";
import { createPlayer } from "./graphql/mutations";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CarsPage from "./pages/CarsPage/CarsPage";

const client = generateClient();

Amplify.configure(awsExports);

export default function App() {
  const [nickname, setNickname] = useState(
    localStorage.getItem("CAR_AUCTION_NICKNAME")
  );
  const [money, setMoney] = useState(0);
  const [players, setPlayers] = useState([]);
  const [playerInfo, setPlayerInfo] = useState(null);

  const listPlayersFunc = async () => {
    const playersData = await client.graphql({ query: listPlayers });
    const playersList = playersData.data.listPlayers.items;
    setPlayers(playersList);
  };

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

    // Set the money state immediately after creating a new player
    setMoney(1000);
  }

  useEffect(() => {
    let isDataFetched = false;

    const fetchData = async () => {
      if (!isDataFetched) {
        !players.length && (await listPlayersFunc());
        isDataFetched = true;

        const currentPlayer = players.find((pl) => pl.nickname === nickname);
        if (currentPlayer) {
          setPlayerInfo(currentPlayer);
          setMoney(currentPlayer.money);
        }
      }
    };

    fetchData();
  }, [nickname, players]);

  const listener = async (data) => {
    const nicknames = players.map((pl) => pl.nickname);
    const isNewUser = !nicknames.includes(data?.payload?.data?.nickname);
    if (
      !isNewUser &&
      data.payload.event === "signedIn" &&
      data?.payload?.data?.userId.length &&
      data?.payload?.data?.username.length
    ) {
      createNewPlayer(
        data?.payload?.data?.userId,
        data?.payload?.data?.username
      );
    }
    const currentPlayer = players.find(
      (pl) => pl.nickname === data?.payload?.data?.username
    );
    setPlayerInfo(currentPlayer);
    setNickname(data?.payload?.data?.username);
    setMoney(currentPlayer.money);
    localStorage.setItem("CAR_AUCTION_NICKNAME", data?.payload?.data?.username);
  };

  Hub.listen("auth", listener);

  return (
    <BrowserRouter>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <CustomHeader nickname={nickname} money={money} user={user} />
            <h2>{money} </h2>
            <Routes>
              <Route
                path="/cars"
                element={
                  <CarsPage
                  playerInfo={playerInfo}
                    money={money}
                    setMoney={setMoney}
                  />
                }
              />
              <Route
                path="/auctions"
                element={
                  <AuctionPage
                    playerInfo={playerInfo}
                    money={money}
                    setMoney={setMoney}
                  />
                }
              />
            </Routes>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </BrowserRouter>
  );
}
