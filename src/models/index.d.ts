import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

type EagerAuction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Auction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly carName: string;
  readonly player: string;
  readonly buy: number;
  readonly minBid: number;
  readonly currentBid?: number | null;
  readonly endTime: string;
  readonly status: string;
  readonly lastBidPlayer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAuction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Auction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly carName: string;
  readonly player: string;
  readonly buy: number;
  readonly minBid: number;
  readonly currentBid?: number | null;
  readonly endTime: string;
  readonly status: string;
  readonly lastBidPlayer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Auction = LazyLoading extends LazyLoadingDisabled ? EagerAuction : LazyAuction

export declare const Auction: (new (init: ModelInit<Auction>) => Auction) & {
  copyOf(source: Auction, mutator: (draft: MutableModel<Auction>) => MutableModel<Auction> | void): Auction;
}

type EagerPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nickname?: string | null;
  readonly cars?: (CarPlayer | null)[] | null;
  readonly money?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nickname?: string | null;
  readonly cars: AsyncCollection<CarPlayer>;
  readonly money?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Player = LazyLoading extends LazyLoadingDisabled ? EagerPlayer : LazyPlayer

export declare const Player: (new (init: ModelInit<Player>) => Player) & {
  copyOf(source: Player, mutator: (draft: MutableModel<Player>) => MutableModel<Player> | void): Player;
}

type EagerCar = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Car, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly price: number;
  readonly CarsToPlayers?: (CarPlayer | null)[] | null;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCar = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Car, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly price: number;
  readonly CarsToPlayers: AsyncCollection<CarPlayer>;
  readonly type?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Car = LazyLoading extends LazyLoadingDisabled ? EagerCar : LazyCar

export declare const Car: (new (init: ModelInit<Car>) => Car) & {
  copyOf(source: Car, mutator: (draft: MutableModel<Car>) => MutableModel<Car> | void): Car;
}

type EagerCarPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CarPlayer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerId?: string | null;
  readonly carId?: string | null;
  readonly player: Player;
  readonly car: Car;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCarPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CarPlayer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerId?: string | null;
  readonly carId?: string | null;
  readonly player: AsyncItem<Player>;
  readonly car: AsyncItem<Car>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CarPlayer = LazyLoading extends LazyLoadingDisabled ? EagerCarPlayer : LazyCarPlayer

export declare const CarPlayer: (new (init: ModelInit<CarPlayer>) => CarPlayer) & {
  copyOf(source: CarPlayer, mutator: (draft: MutableModel<CarPlayer>) => MutableModel<CarPlayer> | void): CarPlayer;
}