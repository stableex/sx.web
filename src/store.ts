import { writable } from "svelte/store";

export const head_block_num = writable(0);
export const scatter = writable("");
export const account = writable("");
export const publicKey = writable("");
export const ethereum = writable("{}");
export const time = writable("");
export const error = writable("");
export const connected = writable(false);
export const trx_id = writable("");
export const busn = writable("");
export const busdt = writable("");
export const sxf = writable("");
