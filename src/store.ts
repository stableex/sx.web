import { writable } from "svelte/store";
import { ZERO_EXT_ASSET } from "./assets"

export const head_block_num = writable(0);
export const scatter = writable("");
export const account = writable("");
export const publicKey = writable("");
export const ethereum = writable("{}");
export const time = writable("");
export const error = writable("");
export const connected = writable(false);
export const trx_id = writable("");

export const busn = writable(ZERO_EXT_ASSET);
export const busdt = writable(ZERO_EXT_ASSET);
export const sxf = writable(ZERO_EXT_ASSET);

export const usn = writable(ZERO_EXT_ASSET);
export const usdt = writable(ZERO_EXT_ASSET);
export const sxa = writable(ZERO_EXT_ASSET);
