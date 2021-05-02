import { rpc } from "./scatter";
import * as store from "./store";

export function update_block() {
  rpc.get_info().then((info) => {
    store.head_block_num.set(info.head_block_num);
    setTimeout(update_block, 5000);
  });
}

export function update_time() {
  store.time.set(String(new Date()));
  setTimeout(update_time, 5000);
}

export function detect_wallet() {
  const win: any = window;
  if (window) store.ethereum.set(JSON.stringify((win || "").ethereum));
}
