import { rpc } from "./scatter";
import * as store from "./store";
import { Asset, ExtendedAsset, ExtendedSymbol, Sym, Name } from "eos-common";
import { ZERO_EXT_ASSET } from "./assets"

// export function update_block() {
//   rpc.get_info().then((info) => {
//     store.head_block_num.set(info.head_block_num);
//     setTimeout(update_block, 5000);
//   });
// }

// export function update_time() {
//   store.time.set(new Date().toLocaleString());
//   setTimeout(update_time, 500);
// }

export function detect_wallet() {
  const win: any = window;
  if (window) store.ethereum.set(JSON.stringify((win || "").ethereum));
}

export async function update_tokens(account: string) {
  if ( account ) {
    store.busdt.set(await get_balance("btoken.defi", account, "BUSDT"));
    store.busn.set(await get_balance("btoken.defi", account, "BUSN"));
    store.sxf.set(await get_balance("lptoken.sx", account, "SXF"));

    store.usdt.set(await get_balance("tethertether", account, "USDT"));
    store.usn.set(await get_balance("danchortoken", account, "USN"));
    store.sxa.set(await get_balance("lptoken.sx", account, "SXA"));
  }
}

async function get_balance( code: string, account: string, symcode: string ) {
  const results = await rpc.get_currency_balance(code, account, symcode);
  if ( results[0] ) {
    return new ExtendedAsset(new Asset(results[0]), new Name(code));
  }
  return new ExtendedAsset(0, new ExtendedSymbol(new Sym(symcode, 0), new Name(code)));
}

// (async () => {
//   console.log( await get_btokens("izmraegivxqz", "BUSDT"));
// })()
