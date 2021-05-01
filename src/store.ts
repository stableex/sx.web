import { writable } from "svelte/store";

export const head_block_num = writable(0);
export const scatter = writable("{}");
export const account = writable("{}");
export const ethereum = writable("{}");
export const time = writable("");
export const is_connected = writable(false);
