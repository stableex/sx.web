import { rpc } from "./scatter";
import * as store from "./store";

export function update_block() {
  rpc.get_info().then((info) => {
    store.head_block_num.set(info.head_block_num);
    setTimeout(update_block, 5000);
  });
}

export function update_time() {
  store.time.set(new Date().toLocaleString());
  setTimeout(update_time, 500);
}

export function detect_wallet() {
  const win: any = window;
  if (window) store.ethereum.set(JSON.stringify((win || "").ethereum));
}

export async function update_btokens(account: string) {
  if ( account ) {
    store.busdt.set((await rpc.get_currency_balance("btoken.defi", account, "BUSDT"))[0]);
    store.busn.set((await rpc.get_currency_balance("btoken.defi", account, "BUSN"))[0]);
    store.sxf.set((await rpc.get_currency_balance("lptoken.sx", account, "SXF"))[0]);
  }
}

// async function get_balance( account: string, symcode: string ){
//   const results = await rpc.get_table_rows({json: true, code: "btokens.defi", scope: account, table: "accounts", lower_bound: symcode, upper_bound: symcode, limit: 1});
//   if ( results.rows[0] ) {
//     return Number(results.rows[0].balance.split(" "));
//   }
//   return 0;
// }

// (async () => {
//   console.log( await get_btokens("izmraegivxqz", "BUSDT"));
// })()
