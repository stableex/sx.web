import { ScatterJS, ScatterEOS } from "scatter-ts";
import { Api, JsonRpc } from "eosjs";
import * as store from "./store";

ScatterJS.plugins(new ScatterEOS());

export const network = ScatterJS.Network.fromJson({
  blockchain: "eos",
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  host: "eos.eosn.io",
  port: 443,
  protocol: "https",
});

export const rpc = new JsonRpc(network.fullhost());

export async function login() {
  const identity = await ScatterJS.login();
  store.scatter.set(JSON.stringify(identity));
  const account = ScatterJS.account("eos");
  store.account.set(JSON.stringify(account));
}

export async function forget() {
  await ScatterJS.scatter.forgetIdentity();
  store.connected.set(ScatterJS.scatter.isConnected());
  store.scatter.set("{}");
  store.account.set("{}");
}

export async function connect() {
  const connected = await ScatterJS.connect("SX Web", { network });
  store.connected.set(connected);
  await login();
}

export async function disconnect() {
  ScatterJS.scatter.disconnect();
  store.connected.set(ScatterJS.scatter.isConnected());
  store.scatter.set("{}");
  store.account.set("{}");
}

export function get_api() {
  return ScatterJS.eos(network, Api, { rpc });
}

