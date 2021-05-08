import { get_api } from "./scatter";
import { ScatterJS, Action } from "scatter-ts";
import * as store from "./store";
import { is_lend_staked } from "./lend.defi"

export function ping() {
    const account = ScatterJS.account("eos");
    transact([{
        account: 'pingpong.sx',
        name: 'ping',
        authorization: [{
            actor: account.name,
            permission: account.authority,
        }],
        data: {
            name: account.name
        },
    }]);
};

export async function withdraw( sxf: string ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]

    // send BUSDT or BUSN
    transact([{
        account: 'lptoken.sx',
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: sxf,
            memo: "withdraw"
        },
    }]);
};


export async function deposit( busdt: string, busn: string ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]
    console.log(busdt, busn);
    const actions: Action[] = [];

    // unstake BUSDT or BUSN
    const is_busdt_staked = await is_lend_staked( account.name, 2 );
    const is_busn_staked = await is_lend_staked( account.name, 5 );
    console.log("is_busdt_staked", is_busdt_staked)
    console.log("is_busn_staked", is_busn_staked)
    if ( is_busdt_staked ) {
        actions.push({
            account: 'lend.defi',
            name: 'unstake',
            authorization,
            data: {
                owner: account.name,
                sym: "BUSDT",
            },
        });
    }
    if ( is_busn_staked ) {
        console.log("staked USN");
        actions.push({
            account: 'lend.defi',
            name: 'unstake',
            authorization,
            data: {
                owner: account.name,
                sym: "BUSN",
            },
        });
    }

    // send BUSDT or BUSN
    actions.push(...[{
        account: 'btoken.defi',
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: busdt,
            memo: "deposit,SXF"
        },
    },{
        account: 'btoken.defi',
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: busn,
            memo: "deposit,SXF"
        },
    },{
        account: 'curve.sx',
        name: 'deposit',
        authorization,
        data: {
            owner: account.name,
            pair_id: "SXF"
        },
    }]);

    transact(actions);
};

async function transact(actions: Action[]) {
    const api = get_api();
    try {
        const result = await api.transact({ actions }, { blocksBehind: 3, expireSeconds: 30 });
        console.log('sent: ', result);
        store.error.set("")
        store.trx_id.set( result.transaction_id );
    } catch (err) {
        store.error.set( err.isError ? JSON.stringify(err) : err )
        console.error('error: ', err);
        store.trx_id.set("");
    }
}