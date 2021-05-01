import { ScatterJS, ScatterEOS } from 'scatter-ts';
import * as store from "./store";
import { Api, JsonRpc } from "eosjs";

ScatterJS.plugins( new ScatterEOS() );

export const network = ScatterJS.Network.fromJson({
    blockchain: 'eos',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eos.eosn.io',
    port: 443,
    protocol: 'https'
});

export const rpc = new JsonRpc(network.fullhost());

export async function login() {
    const connected = await ScatterJS.connect('SX', {network});
    store.is_connected.set(connected);
    if ( connected ) {
        const id = await ScatterJS.login();
        store.scatter.set(JSON.stringify(id));
        get_account();
    }
}

export function get_api() {
    return ScatterJS.eos(network, Api, { rpc });
}

export function get_account() {
    const account = ScatterJS.account('eos');
    store.account.set(JSON.stringify(account));
    return account;
}