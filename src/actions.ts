import { get_api } from "./scatter";
import { ScatterJS } from "scatter-ts";
import * as store from "./store";

export function ping() {
    console.log("ping");
    const api = get_api();
    console.dir(ScatterJS )
    const account = ScatterJS.account("eos");
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
