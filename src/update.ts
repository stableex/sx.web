import { rpc, login } from "./scatter";
import { head_block_num } from "./store";

export function update_block() {
    rpc.get_info().then( info => {
        head_block_num.set(info.head_block_num);
        setTimeout(update_block, 3000);
        login();
    });
}

// var span = document.querySelector('#time-now');
// var scatter = document.querySelector('#scatter');
// var block = document.querySelector('#block');
// // var mykey = document.querySelector('#mykey');
// // var tp = document.querySelector('#tp');
// // var metamask = document.querySelector('#metamask');

// export function update_time() {
// 	if (span) span.textContent = new Date().toISOString();
// 	setTimeout(update_time, 1000);
// }

// export function update_scatter(id: string) {
// 	if ( scatter ) scatter.textContent = JSON.stringify(id);
// }

// // export function detect_wallet() {
// // 	metamask.textContent = (window.ethereum && window.ethereum.isMetaMask) ? window.ethereum.isMetaMask : false;
// // 	tp.textContent = (window.ethereum && window.ethereum.isTokenPocket) ? window.ethereum.isTokenPocket : false;
// // 	mykey.textContent = (window.ethereum && window.ethereum.isMYKEY) ? window.ethereum.isMYKEY : false;
// // }