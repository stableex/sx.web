import { rpc } from "./scatter";

var span = document.querySelector('#time-now');
var scatter = document.querySelector('#scatter');
var block = document.querySelector('#block');
var mykey = document.querySelector('#mykey');
var tp = document.querySelector('#tp');
var metamask = document.querySelector('#metamask');

export function update_time() {
	span.textContent = new Date().toISOString();
	setTimeout(update_time, 1000);
}

export function update_block() {
	rpc.get_info().then( info => {
		block.textContent = info.head_block_num;
		setTimeout(update_block, 1000);
	});
}

export function update_scatter(id) {
	scatter.textContent = JSON.stringify(id);
}

export function detect_wallet() {
	metamask.textContent = (window.ethereum && window.ethereum.isMetaMask) ? window.ethereum.isMetaMask : false;
	tp.textContent = (window.ethereum && window.ethereum.isTokenPocket) ? window.ethereum.isTokenPocket : false;
	mykey.textContent = (window.ethereum && window.ethereum.isMYKEY) ? window.ethereum.isMYKEY : false;
}
