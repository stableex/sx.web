// import { get_api, get_account } from 'scatter';

// var error = document.querySelector('#error');

// document.querySelector('#button').onclick = () => {
//     const api = get_api();
//     const account = get_account();
//     const actions = {
//         actions: [{
//             account: 'eosio.token',
//             name: 'transfer',
//             authorization: [{
//                 actor: account.name,
//                 permission: account.authority,
//             }],
//             data: {
//                 from: account.name,
//                 to: 'safetransfer',
//                 quantity: '0.0001 EOS',
//                 memo: account.name,
//             },
//         }]
//     }
//     api.transact(actions, {
//         blocksBehind: 3,
//         expireSeconds: 30,
//     }).then(res => {
//         console.log('sent: ', res);
//     }).catch(err => {
//         error.textContent = err.isError ? JSON.stringify(err) : err;
//         console.error('error: ', err);
//     });
// };