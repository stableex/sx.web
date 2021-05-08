import { ScatterJS, ScatterEOS } from "scatter-ts";
import { Api, JsonRpc } from "eosjs";
import * as store from "./store";

ScatterJS.plugins(new ScatterEOS());

export const network = ScatterJS.Network.fromJson({
  blockchain: "eos",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  host: "eos.greymass.com",
  port: 443,
  protocol: "https",
});

export const rpc = new JsonRpc(network.fullhost());

export async function login() {
  const connected = await ScatterJS.connect("SX Web", { network });
  store.connected.set(connected);
  if ( connected ) {
    const identity = await ScatterJS.login();
    const account = ScatterJS.account("eos");
    console.log("identity", identity)
    console.log("account", account)
    store.account.set(account.name);
    store.publicKey.set(account.publicKey);
  }
}

export async function forget() {
  await ScatterJS.scatter.forgetIdentity();
  store.connected.set(ScatterJS.scatter.isConnected());
  store.publicKey.set("");
  store.scatter.set("");
  store.account.set("");
}

export async function logout() {
  await ScatterJS.scatter.forgetIdentity();
  ScatterJS.scatter.disconnect();
  store.connected.set(ScatterJS.scatter.isConnected());
  store.publicKey.set("");
  store.scatter.set("");
  store.account.set("");
}

export async function connect() {
  const connected = await ScatterJS.connect("SX Web", { network });
  store.connected.set(connected);
  await login();
}

export async function disconnect() {
  ScatterJS.scatter.disconnect();
  store.connected.set(ScatterJS.scatter.isConnected());
  store.publicKey.set("");
  store.scatter.set("");
  store.account.set("");
}

export function get_api() {
  return ScatterJS.eos(network, Api, { rpc });
}

