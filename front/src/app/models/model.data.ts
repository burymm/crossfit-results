import { UserProfile } from './models';

export function defaultUserData(): UserProfile {
  return {
    name: '',
    email: '',
    picture: '',
    id: '',
  }
}
