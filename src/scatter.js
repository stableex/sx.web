import ScatterJS from '../scatter/core/src/index';
import { network } from "./config";
import { update_scatter } from "./update"

// Login with Scatter
export function login() {
    console.log("connecting...")
    ScatterJS.connect('SX', {network}).then(async connected => {
        console.log("connected:", connected);
        const id = await ScatterJS.login();
        update_scatter(id)
    });
}
