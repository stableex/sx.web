import { get_api, get_account } from "./scatter";
import * as store from "./store";

export function ping() {
    console.log("ping");
    const api = get_api();
    const account = get_account();
    console.log(account.name);
    const actions = {
        actions: [{
            account: 'pingpong.sx',
            name: 'ping',
            authorization: [{
                actor: account.name,
                permission: account.authority,
            }],
            data: {
                name: account.name
            },
        }]
    }
    api.transact(actions, {
        blocksBehind: 3,
        expireSeconds: 30,
    }).then(res => {
        console.log('sent: ', res);
    }).catch(err => {
        store.error.set( err.isError ? JSON.stringify(err) : err )
        console.error('error: ', err);
    });
};
