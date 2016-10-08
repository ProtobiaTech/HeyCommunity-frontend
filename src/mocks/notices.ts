import { Notice } from '../models/notice';
import { USERS } from '../mocks/users'
import { TIMELINES } from '../mocks/timelines'


export const NOTICES: Notice[] = [
  {
    id: 1,
    owner: USERS[0],
    initiator: USERS[1],
    entity: TIMELINES[0],
  },
  {
    id: 2,
    owner: USERS[0],
    initiator: USERS[2],
    entity: TIMELINES[2],
  },
  {
    id: 1,
    owner: USERS[0],
    initiator: USERS[2],
    entity: TIMELINES[1],
  },
  {
    id: 1,
    owner: USERS[0],
    initiator: USERS[1],
    entity: TIMELINES[3],
  },
  {
    id: 1,
    owner: USERS[0],
    initiator: USERS[2],
    entity: TIMELINES[2],
  },
];
