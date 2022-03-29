import Global from './Global';
import Score from './Score';

export default class Student extends Global {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  scores: Score[];
}
