import { rpc } from "./scatter"

export async function is_lend_staked(account: string, reserve_id: number ): Promise<boolean> {
    const results = await rpc.get_table_rows({json: true, code: "lend.defi", scope: account, table: "userconfigs", lower_bound: reserve_id, upper_bound: reserve_id, limit: 1 });
    console.log(account, reserve_id, results.rows[0], results.rows[0].use_as_collateral);
    if ( results.rows.length ) return results.rows[0].use_as_collateral == 1;
    return false;
}