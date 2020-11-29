import ScatterJS from '../scatter/core/src/index';
import { api } from "./config";

var error = document.querySelector('#error');

document.querySelector('#button').onclick = () => {
	const account = ScatterJS.account('eos');
    api.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                // actor: account.name,
                actor: "mykeypostman",
                permission: account.authority,
            }],
            data: {
                from: account.name,
                to: 'safetransfer',
                quantity: '0.0001 EOS',
                memo: account.name,
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    }).then(res => {
        console.log('sent: ', res);
    }).catch(err => {
        error.textContent = err
        console.error('error: ', err);
    });
};

