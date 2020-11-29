import { update_time, update_block } from './update';
import { login } from './scatter';
import * as actions from './actions';

// Update local time & blocks
update_time()
update_block();
login();
