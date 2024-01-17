/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAuction = /* GraphQL */ `
  query GetAuction($id: ID!) {
    getAuction(id: $id) {
      id
      carName
      player
      buy
      minBid
      currentBid
      endTime
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAuctions = /* GraphQL */ `
  query ListAuctions(
    $filter: ModelAuctionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuctions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        carName
        player
        buy
        minBid
        currentBid
        endTime
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      nickname
      cars {
        nextToken
        __typename
      }
      money
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nickname
        money
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCar = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
      make
      model
      year
      price
      auctionEndTime
      CarsToPlayers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCars = /* GraphQL */ `
  query ListCars(
    $filter: ModelCarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        make
        model
        year
        price
        auctionEndTime
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCarPlayer = /* GraphQL */ `
  query GetCarPlayer($id: ID!) {
    getCarPlayer(id: $id) {
      id
      playerId
      carId
      player {
        id
        nickname
        money
        userId
        createdAt
        updatedAt
        __typename
      }
      car {
        id
        make
        model
        year
        price
        auctionEndTime
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCarPlayers = /* GraphQL */ `
  query ListCarPlayers(
    $filter: ModelCarPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        playerId
        carId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const carPlayersByPlayerId = /* GraphQL */ `
  query CarPlayersByPlayerId(
    $playerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCarPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    carPlayersByPlayerId(
      playerId: $playerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        playerId
        carId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const carPlayersByCarId = /* GraphQL */ `
  query CarPlayersByCarId(
    $carId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCarPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    carPlayersByCarId(
      carId: $carId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        playerId
        carId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
