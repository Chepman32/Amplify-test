import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import AuctionPage from "./pages/AuctionPage/AuctionPage";
import CustomHeader from "./components/CustomHeader";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { Hub } from "aws-amplify/utils";
import { generateClient } from "aws-amplify/api";
import { listPlayers, listUsers } from "./graphql/queries";
import { createUser } from "./graphql/mutations";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CarsPage from "./pages/CarsPage/CarsPage";
import { Spin, message } from "antd";
import { getCurrentUser } from "aws-amplify/auth";

async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    const playersData = await client.graphql({ query: listUsers });
    const playersList = playersData.data.listUsers.items;
    const user = playersList.filter((u) => u.nickname === username)[0];
    console.log(playersList);
    return user;
  } catch (err) {
    console.log(err);
  }
}

const client = generateClient();

Amplify.configure(awsExports);

export default function App() {
  const [nickname, setNickname] = useState();
  const [money, setMoney] = useState();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createNewPlayer(username) {
    const data = {
      nickname: username,
      money: 1000,
    };
    await client.graphql({
      query: createUser,
      variables: { input: data },
    });
    message.success("User successfully created");
  }

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const info = await currentAuthenticatedUser();
        setPlayerInfo(info);
        !money && setMoney(info.money);
      } catch (error) {
        console.error("Error fetching player info:", error);
      }
    };

    fetchPlayerInfo();
  }, [money]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoading(false);
    };
    fetchData();
  }, []);

  const listener = async (data) => {
    if (data.payload.event === "signedIn") {
      const playersData = await client.graphql({ query: listUsers });
      const playersList = playersData.data.listUsers.items;
      const isNewUser = playersList.filter(
        (u) => u.nickname === data?.payload?.data?.nickname
      )[0];
      console.log(playersList, isNewUser);
      if (isNewUser) {
        createNewPlayer(data?.payload?.data?.username);
      }
      setNickname(data?.payload?.data?.username);
      localStorage.setItem(
        "CAR_AUCTION_NICKNAME",
        data?.payload?.data?.username
      );
    }
  };

  Hub.listen("auth", listener);

  return (
    <BrowserRouter>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            {nickname !== null && (
              <main>
                {playerInfo && (
                  <CustomHeader
                    money={playerInfo.money}
                    username={playerInfo.nickname}
                  />
                )}
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
              </main>
            )}
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Authenticator>
    </BrowserRouter>
  );
}
