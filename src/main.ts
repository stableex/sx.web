import App from './app.svelte'

const app = new App({
    target: document.body,
})

export default app

if (import.meta.hot) {
    import.meta.hot.accept()
    import.meta.hot.dispose(() => {
        app.$destroy()
    })
}


// import { login } from './scatter';
// import { update_time, update_block, detect_wallet } from './update';
// import * as actions from './actions';

// // // debugging
// // import VConsole from "vconsole";
// // new VConsole();

// // Update local time & blocks
// update_time()
// update_block();
// login();
// detect_wallet();