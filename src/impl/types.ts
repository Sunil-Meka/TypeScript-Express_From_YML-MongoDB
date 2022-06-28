import {ApiImplementation} from '../../dist/types'
import { UserApiImpl } from './user/types';
export class serviceImpl implements ApiImplementation{
	user: UserApiImpl = new UserApiImpl;

}