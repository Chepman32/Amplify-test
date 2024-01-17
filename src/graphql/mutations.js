/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAuction = /* GraphQL */ `
  mutation CreateAuction(
    $input: CreateAuctionInput!
    $condition: ModelAuctionConditionInput
  ) {
    createAuction(input: $input, condition: $condition) {
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
export const updateAuction = /* GraphQL */ `
  mutation UpdateAuction(
    $input: UpdateAuctionInput!
    $condition: ModelAuctionConditionInput
  ) {
    updateAuction(input: $input, condition: $condition) {
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
export const deleteAuction = /* GraphQL */ `
  mutation DeleteAuction(
    $input: DeleteAuctionInput!
    $condition: ModelAuctionConditionInput
  ) {
    deleteAuction(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
export const createCar = /* GraphQL */ `
  mutation CreateCar(
    $input: CreateCarInput!
    $condition: ModelCarConditionInput
  ) {
    createCar(input: $input, condition: $condition) {
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
export const updateCar = /* GraphQL */ `
  mutation UpdateCar(
    $input: UpdateCarInput!
    $condition: ModelCarConditionInput
  ) {
    updateCar(input: $input, condition: $condition) {
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
export const deleteCar = /* GraphQL */ `
  mutation DeleteCar(
    $input: DeleteCarInput!
    $condition: ModelCarConditionInput
  ) {
    deleteCar(input: $input, condition: $condition) {
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
export const createCarPlayer = /* GraphQL */ `
  mutation CreateCarPlayer(
    $input: CreateCarPlayerInput!
    $condition: ModelCarPlayerConditionInput
  ) {
    createCarPlayer(input: $input, condition: $condition) {
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
export const updateCarPlayer = /* GraphQL */ `
  mutation UpdateCarPlayer(
    $input: UpdateCarPlayerInput!
    $condition: ModelCarPlayerConditionInput
  ) {
    updateCarPlayer(input: $input, condition: $condition) {
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
export const deleteCarPlayer = /* GraphQL */ `
  mutation DeleteCarPlayer(
    $input: DeleteCarPlayerInput!
    $condition: ModelCarPlayerConditionInput
  ) {
    deleteCarPlayer(input: $input, condition: $condition) {
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
