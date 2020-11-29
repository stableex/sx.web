import { update_time, update_block, update_mykey } from './update';
import { login } from './scatter';
import * as actions from './actions';

// Update local time & blocks
update_time()
update_block();
login();
update_mykey();