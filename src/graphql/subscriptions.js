/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAuction = /* GraphQL */ `
  subscription OnCreateAuction($filter: ModelSubscriptionAuctionFilterInput) {
    onCreateAuction(filter: $filter) {
      id
      carName
      player
      buy
      minBid
      currentBid
      endTime
      status
      lastBidPlayer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAuction = /* GraphQL */ `
  subscription OnUpdateAuction($filter: ModelSubscriptionAuctionFilterInput) {
    onUpdateAuction(filter: $filter) {
      id
      carName
      player
      buy
      minBid
      currentBid
      endTime
      status
      lastBidPlayer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAuction = /* GraphQL */ `
  subscription OnDeleteAuction($filter: ModelSubscriptionAuctionFilterInput) {
    onDeleteAuction(filter: $filter) {
      id
      carName
      player
      buy
      minBid
      currentBid
      endTime
      status
      lastBidPlayer
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onCreatePlayer(filter: $filter) {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onUpdatePlayer(filter: $filter) {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer($filter: ModelSubscriptionPlayerFilterInput) {
    onDeletePlayer(filter: $filter) {
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
export const onCreateCar = /* GraphQL */ `
  subscription OnCreateCar($filter: ModelSubscriptionCarFilterInput) {
    onCreateCar(filter: $filter) {
      id
      make
      model
      year
      price
      CarsToPlayers {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCar = /* GraphQL */ `
  subscription OnUpdateCar($filter: ModelSubscriptionCarFilterInput) {
    onUpdateCar(filter: $filter) {
      id
      make
      model
      year
      price
      CarsToPlayers {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCar = /* GraphQL */ `
  subscription OnDeleteCar($filter: ModelSubscriptionCarFilterInput) {
    onDeleteCar(filter: $filter) {
      id
      make
      model
      year
      price
      CarsToPlayers {
        nextToken
        __typename
      }
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCarPlayer = /* GraphQL */ `
  subscription OnCreateCarPlayer(
    $filter: ModelSubscriptionCarPlayerFilterInput
  ) {
    onCreateCarPlayer(filter: $filter) {
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
        type
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
export const onUpdateCarPlayer = /* GraphQL */ `
  subscription OnUpdateCarPlayer(
    $filter: ModelSubscriptionCarPlayerFilterInput
  ) {
    onUpdateCarPlayer(filter: $filter) {
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
        type
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
export const onDeleteCarPlayer = /* GraphQL */ `
  subscription OnDeleteCarPlayer(
    $filter: ModelSubscriptionCarPlayerFilterInput
  ) {
    onDeleteCarPlayer(filter: $filter) {
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
        type
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
