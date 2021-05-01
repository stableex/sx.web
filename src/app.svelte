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

<script>
	import { update_block, update_time, detect_wallet } from "./update"
	import { login } from "./scatter"
	import * as store from "./store"
	import VConsole from "vconsole";
	new VConsole();

	let head_block_num: number;
	store.head_block_num.subscribe(value => {
		head_block_num = value;
	});

	let time = "";
	store.time.subscribe(value => {
		time = value;
	});

	let scatter: any = {};
	store.scatter.subscribe(value => {
		scatter = JSON.parse(value || "{}");
	});

	let account: any = {};
	store.account.subscribe(value => {
		account = JSON.parse(value || "{}");
	});

	let ethereum: any = {};
	store.ethereum.subscribe(value => {
		ethereum = JSON.parse(value || "{}");
	});

	update_block();
	update_time();
	detect_wallet();
	login();

</script>

<div class="main">
	<div><b>Block Number:</b> {head_block_num}</div>
	<div><b>Time:</b> {time}</div>
	<div><b>EOS Public Key:</b> {account.publicKey}</div>
	<div><b>EOS Account:</b> {account.name}</div>

	<div><b>isMetaMask:</b> {ethereum.isMetaMask ? true : false}</div>
	<div><b>isTokenPocket:</b> {ethereum.isTokenPocket ? true : false}</div>
	<div><b>isMYKEY:</b> {ethereum.isMYKEY ? true : false }</div>
	<div><b>Scatter:</b> {JSON.stringify(scatter)}</div>
	<div><b>Ethereum:</b> {JSON.stringify(ethereum)}</div>
</div>
