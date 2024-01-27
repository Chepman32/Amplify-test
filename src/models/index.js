// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Auction, User, Car } = initSchema(schema);

export {
  Note,
  Auction,
  User,
  Car
};