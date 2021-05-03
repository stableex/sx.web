<script lang="ts">
  import { update_block, update_time, detect_wallet } from "./update";
  import { ping } from "./actions";
  import { login, connect, forget, disconnect } from "./scatter";
  import * as store from "./store";
  import VConsole from "vconsole";
  new VConsole();

  let head_block_num: number;
  store.head_block_num.subscribe((value) => {
    head_block_num = value;
  });

  let time = "";
  store.time.subscribe((value) => {
    time = value;
  });

  let error = "";
  store.error.subscribe((value) => {
    error = value;
  });

  let connected = false;
  store.connected.subscribe((value) => {
    connected = value;
  });

  let scatter = "{}";
  store.scatter.subscribe((value) => {
    scatter = value || "{}";
  });

  let account = "{}";
  store.account.subscribe((value) => {
    account = value || "{}";
  });

  let ethereum = "{}";
  store.ethereum.subscribe((value) => {
    ethereum = value || "{}";
  });

  connect();
  update_block();
  update_time();
  detect_wallet();
</script>

<div class="main">
  <div><b>Block Number:</b> {head_block_num}</div>
  <div><b>Time:</b> {time}</div>
  <div><b>EOS Public Key:</b> {JSON.parse(account).publicKey}</div>
  <div><b>EOS Account:</b> {JSON.parse(account).name}</div>
  <div><b>Error Message:</b> {error}</div>
  <div><b>Connected:</b> {connected}</div>

  <div><b>isMetaMask:</b> {JSON.parse(ethereum).isMetaMask ? true : false}</div>
  <div><b>isTokenPocket:</b> {JSON.parse(ethereum).isTokenPocket ? true : false}</div>
  <div><b>isMYKEY:</b> {JSON.parse(ethereum).isMYKEY ? true : false}</div>
  <div><b>Scatter:</b> {scatter}</div>
  <div><b>Ethereum:</b> {ethereum}</div>

  <button on:click={ping}>ping</button>
  <button on:click={login}>login</button>
  <button on:click={connect}>connect</button>
  <button on:click={forget}>forget</button>
  <button on:click={disconnect}>disconnect</button>
</div>

<style lang="scss" global>
  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: rgb(224, 237, 207);
    padding-right: 10%;
    padding-top: 10%;
    padding-left: 10%;
  }
  .main {
    padding: 1em;
    max-width: 1024px;
    overflow-wrap: break-word;
    background-color: rgb(228, 216, 216);
  }
</style>
