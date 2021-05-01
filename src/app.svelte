<style lang="scss" global>
    .main {
        padding: 1em;
        max-width: 1024px;
    }
</style>

<script>
	import { update_block, update_time, detect_wallet } from "./update"
	import { login } from "./scatter"
	import * as store from "./store"

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
		scatter = JSON.parse(value);
	});

	let account: any = {};
	store.account.subscribe(value => {
		account = JSON.parse(value);
	});

	let ethereum: any = {};
	store.ethereum.subscribe(value => {
		ethereum = JSON.parse(value);
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
