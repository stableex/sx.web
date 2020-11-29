import format from 'date-fns/format';
import { rpc } from "./config";

var span = document.querySelector('#time-now');
var scatter = document.querySelector('#scatter');
var block = document.querySelector('#block');
// var button = document.querySelector('#button');

export function update_time() {
	span.textContent = format(new Date(), 'h:mm:ssa');
	setTimeout(update_time, 1000);
}

export function update_block() {
	rpc.get_info().then( info => {
		block.textContent = info.head_block_num;
		setTimeout(update_block, 1000);
	});
}

export function update_scatter(id) {
	scatter.textContent = `${ id.accounts[0].name }@${ id.publicKey }`;
}

