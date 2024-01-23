// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Auction, Player, Car, CarPlayer } = initSchema(schema);

export {
  Note,
  Auction,
  Player,
  Car,
  CarPlayer
};