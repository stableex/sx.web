<script lang="ts">

  import { update_block, update_time, detect_wallet, update_tokens } from "./update";
  import { deposit_sxa, deposit_sxf, withdraw, unlend, lend, zap } from "./actions";
  import { login, logout } from "./scatter";
  import { to_number, is_empty, to_amount } from "./assets"
  import { ZERO_EXT_ASSET } from "./assets";
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
    if ( !account && value ) update_tokens(value);
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

  let busdt = ZERO_EXT_ASSET;
  let busn = ZERO_EXT_ASSET;
  let sxf = ZERO_EXT_ASSET;
  store.busdt.subscribe((value) => busdt = value );
  store.busn.subscribe((value) => busn = value );
  store.sxf.subscribe((value) => sxf = value );

  let usdt = ZERO_EXT_ASSET;
  let usn = ZERO_EXT_ASSET;
  let sxa = ZERO_EXT_ASSET;
  store.usdt.subscribe((value) => usdt = value );
  store.usn.subscribe((value) => usn = value );
  store.sxa.subscribe((value) => sxa = value );

  let trx_id = "";
  store.trx_id.subscribe((value) => trx_id = value || "" );

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
    <h3>SXA (USDT + USN)</h3>

    <label>USDT: <input value={to_number(usdt)} on:change={(value) => usdt.quantity.amount = to_amount(usdt, value.target?.value) }>
      <button on:click={() => lend([usdt])} disabled='{is_empty(usdt)}' >➡️ lend</button>
      <button on:click={() => zap(usdt, "SXA")} disabled='{is_empty(usdt)}' >⚡️ zap</button>
    </label><br/>

    <label>USN: <input value={to_number(usn)} on:change={(value) => usn.quantity.amount = to_amount(usn, value.target?.value) }>
      <button on:click={() => lend([usn])} disabled='{is_empty(usn)}' >➡️ lend</button>
      <button on:click={() => zap(usn, "SXA")} disabled='{is_empty(usn)}' >⚡️ zap</button>
    </label><br/>

    <label>SXA: <input value={to_number(sxa)} on:change={(value) => sxa.quantity.amount = to_amount(sxa, value.target?.value) }>
    </label>

    <button on:click={() => deposit_sxa(usdt, usn)} disabled='{is_empty(usdt) || is_empty(usn)}'>🔽 deposit all</button>
    <button on:click={() => withdraw(sxa)} disabled='{is_empty(sxa)}' >🔼 withdraw</button>
    <button on:click={() => lend([usdt, usn])} disabled='{is_empty(usdt) || is_empty(usn)}'>➡️ lend all</button>
  </div>
  <div>
    <h3>SXF (BUSDT + BUSN)</h3>

    <label>BUSDT: <input value={to_number(busdt)} on:change={(value) => busdt.quantity.amount = to_amount(busdt, value.target?.value) }>
      <button on:click={() => unlend([busdt])} disabled='{is_empty(busdt)}' >⬅️ unlend</button>
      <button on:click={() => zap(busdt, "SXF")} disabled='{is_empty(busdt)}' >⚡️ zap</button>
    </label><br/>

    <label>BUSN: <input value={to_number(busn)} on:change={(value) => busn.quantity.amount = to_amount(busn, value.target?.value) }>
      <button on:click={() => unlend([busn])} disabled='{is_empty(busn)}' >⬅️ unlend</button>
      <button on:click={() => zap(busn, "SXF")} disabled='{is_empty(busn)}' >⚡️ zap</button>
    </label><br/>

    <label>SXF: <input value={to_number(sxf)} on:change={(value) => sxf.quantity.amount = to_amount(sxf, value.target?.value) }>
    </label>

    <button on:click={() => deposit_sxf(busdt, busn)} disabled='{is_empty(busdt) || is_empty(busn)}'>🔽 deposit all</button>
    <button on:click={() => withdraw(sxf)} disabled='{is_empty(sxf)}' >🔼 withdraw</button>
    <button on:click={() => unlend([busdt, busn])} disabled='{is_empty(busdt) || is_empty(busn)}'>⬅️ unlend all</button>
  </div>
  <div>
    <b>Token Balances:</b> <button on:click={() => update_tokens(account)}>🔄 refresh</button>
  </div>
  {#if trx_id }
    <div><b>Transaction ID: </b><a href="https://www.bloks.io/transaction/{trx_id}">{trx_id}</a> </div>
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
