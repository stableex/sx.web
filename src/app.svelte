<script>
	import { update_block } from "./update"
	import { get_account, login } from "./scatter"
	import * as store from "./store"

	let head_block_num: number;
	store.head_block_num.subscribe(value => {
		head_block_num = value;
	});

	let scatter_id = "";
	store.scatter_id.subscribe(value => {
		scatter_id = value;
	});

	let account = "";
	store.account.subscribe(value => {
		account = value;
	});

	update_block();
	login();

</script>

<h1>Block Number: {head_block_num}</h1>
<h1>Scatter ID: {scatter_id}</h1>
<h1>EOS Account: {account}</h1>
