import ScatterJS from '../scatter/core/src/index';
import ScatterEOS from '../scatter/plugin-eosjs2/src/index';
import { update_scatter } from "./update"
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
    if ( connected ) {
        const id = await ScatterJS.login();
        update_scatter(id)
    }
}

export function get_api() {
    return ScatterJS.eos(network, Api, { rpc });
}

export function get_account() {
    return ScatterJS.account('eos');
}