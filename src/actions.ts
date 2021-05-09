import { get_api } from "./scatter";
import { ScatterJS, Action } from "scatter-ts";
import * as store from "./store";
import { is_lend_staked } from "./lend.defi"
import { update_tokens } from "./update";
import type { ExtendedAsset } from "eos-common";

export async function unlend( ext_quantities: ExtendedAsset[] ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]

    const actions: Action[] = []

    for ( const ext_quantity of ext_quantities ) {
        if ( Number(ext_quantity.quantity.amount) == 0) continue;
        actions.push({
            account: ext_quantity.contract.toString(),
            name: 'transfer',
            authorization,
            data: {
                from: account.name,
                to: "lend.defi",
                quantity: ext_quantity.quantity.toString(),
                memo: "unstake"
            },
        });
    }
    // send SXA or SXF
    await transact(actions);
    setTimeout( () => update_tokens( account.name ), 2000 );
};


export async function lend( ext_quantities: ExtendedAsset[] ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]

    const actions: Action[] = []

    for ( const ext_quantity of ext_quantities ) {
        if ( Number(ext_quantity.quantity.amount) == 0) continue;
        actions.push({
            account: ext_quantity.contract.toString(),
            name: 'transfer',
            authorization,
            data: {
                from: account.name,
                to: "lend.defi",
                quantity: ext_quantity.quantity.toString(),
                memo: "deposit"
            },
        });
    }
    // send SXA or SXF
    await transact(actions);
    setTimeout( () => update_tokens( account.name ), 2000 );
};

export async function zap( ext_quantity: ExtendedAsset, symcode: string ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]

    const actions: Action[] = [];

    // unstake BUSDT or BUSN
    const in_symcode = ext_quantity.quantity.symbol.code().toString();
    if ( in_symcode == "BUSDT") {
        const is_busdt_staked = await is_lend_staked( account.name, 2 );
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
    }
    else if ( in_symcode == "BUSN" ) {
        const is_busn_staked = await is_lend_staked( account.name, 5 );
        if ( is_busn_staked ) {
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
    }

    actions.push({
        account: ext_quantity.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "zap.sx",
            quantity: ext_quantity.quantity.toString(),
            memo: symcode
        },
    })

    // send SXA or SXF
    await transact(actions);
    setTimeout( () => update_tokens( account.name ), 2000 );
};

export async function withdraw( ext_quantity: ExtendedAsset ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]

    // send SXA or SXF
    await transact([{
        account: ext_quantity.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: ext_quantity.quantity.toString(),
            memo: "withdraw"
        },
    }]);
    setTimeout( () => update_tokens( account.name ), 2000 );
};

export async function deposit_sxa( usdt: ExtendedAsset, usn: ExtendedAsset ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]
    const actions: Action[] = [];

    // send BUSDT or BUSN
    actions.push(...[{
        account: usdt.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: usdt.quantity.toString(),
            memo: "deposit,SXA"
        },
    },{
        account: usn.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: usn.quantity.toString(),
            memo: "deposit,SXA"
        },
    },{
        account: 'curve.sx',
        name: 'deposit',
        authorization,
        data: {
            owner: account.name,
            pair_id: "SXA"
        },
    }]);

    await transact(actions);
    setTimeout( () => update_tokens( account.name ), 2000 );
};

export async function deposit_sxf( busdt: ExtendedAsset, busn: ExtendedAsset ) {
    const account = ScatterJS.account("eos");
    const authorization = [{
        actor: account.name,
        permission: account.authority,
    }]
    const actions: Action[] = [];

    // unstake BUSDT or BUSN
    const is_busdt_staked = await is_lend_staked( account.name, 2 );
    const is_busn_staked = await is_lend_staked( account.name, 5 );

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
        account: busdt.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: busdt.quantity.toString(),
            memo: "deposit,SXF"
        },
    },{
        account: busn.contract.toString(),
        name: 'transfer',
        authorization,
        data: {
            from: account.name,
            to: "curve.sx",
            quantity: busn.quantity.toString(),
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

    // restake to keep same health ratio
    if ( is_busdt_staked ) {
        actions.push({
            account: 'lend.defi',
            name: 'stake',
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
            name: 'stake',
            authorization,
            data: {
                owner: account.name,
                sym: "BUSN",
            },
        });
    }

    await transact(actions);
    setTimeout( () => update_tokens( account.name ), 2000 );
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