<script lang="ts">

  import { update_block, update_time, detect_wallet, update_btokens } from "./update";
  import { ping, deposit, withdraw } from "./actions";
  import { login, connect, forget, logout } from "./scatter";
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

  let account = "";
  store.account.subscribe((value) => {
    if ( !account && value ) update_btokens(value);
    account = value || "";
  });

  let connected = false;
  store.connected.subscribe((value) => {
    connected = value;
  });

  let publicKey = "";
  store.publicKey.subscribe((value) => {
    publicKey = value || "";
  });

  let ethereum = "{}";
  store.ethereum.subscribe((value) => {
    ethereum = value || "{}";
  });

  let busdt = "";
  store.busdt.subscribe((value) => {
    busdt = value || "";
  });
  let busn = "";
  store.busn.subscribe((value) => {
    busn = value || "";
  });
  let sxf = "";
  store.sxf.subscribe((value) => {
    sxf = value || "";
  });

  let trx_id = "";
  store.trx_id.subscribe((value) => {
    trx_id = value || "";
  });

  login();
  update_block();
  update_time();
  detect_wallet();
</script>

<div class="main">
  <!-- <button on:click={ping}>ping</button> -->
  <!-- <button on:click={connect}>connect</button> -->
  <div style="text-align:right">
    {#if !connected} <button on:click={login}>login</button>
    {:else if connected && !account} <button on:click={login}>connecting...</button>
    {:else} <button on:click={logout}>logout</button>
    {/if}
  </div>
  <div><b>Block Number:</b> {head_block_num}</div>
  <div><b>Time:</b> {time}</div>
  <div><b>EOS Public Key:</b> {publicKey}</div>
  <div><b>EOS Account:</b> {account}</div>
  {#if error}<div style="color:red"><b>Error Message:</b> {error}</div>{/if}
  <!-- <div><b>Connected:</b> {connected}</div> -->

  <!-- <div><b>isMetaMask:</b> {JSON.parse(ethereum).isMetaMask ? true : false}</div>
  <div><b>isTokenPocket:</b> {JSON.parse(ethereum).isTokenPocket ? true : false}</div>
  <div><b>isMYKEY:</b> {JSON.parse(ethereum).isMYKEY ? true : false}</div> -->
  <!-- <div><b>Scatter:</b> {scatter}</div>
  <div><b>Ethereum:</b> {ethereum}</div> -->

  <div>
    <label>BUSDT: <input value={busdt}></label><br/>
    <label>BUSN: <input value={busn}></label><br/>
    <label>SXF: <input value={sxf}></label>
  </div>
  <button on:click={() => update_btokens(account)}>🔄 refresh</button>
  <button on:click={() => deposit(busdt, busn)}>🔽 deposit</button>
  <button on:click={() => withdraw(sxf)}>🔼 withdraw</button>
  {#if trx_id }
    <div><b>Transaction ID:</b><a href="https://www.bloks.io/transaction/{trx_id}">{trx_id}</a> </div>
  {/if}
</div>

<style lang="scss" global>
  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: rgb(28, 29, 26);
    padding-right: 10%;
    padding-top: 10%;
    padding-left: 10%;
  }
  .main {
    padding: 1em;
    max-width: 1024px;
    overflow-wrap: break-word;
    background-color: rgba(255, 245, 241, 0.892);
  }
  div {
    padding: 0.3em;
  }
</style>
