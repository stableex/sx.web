import { Sym, Asset, ExtendedAsset, ExtendedSymbol, Name, extended_asset } from "eos-common"
import BigInt from "big-integer"
export const ZERO_ASSET = new Asset(0, new Sym("A", 1));
export const ZERO_EXT_ASSET = new ExtendedAsset(ZERO_ASSET, new Name(0));

export function to_number( ext_asset: ExtendedAsset ) {
    if ( ext_asset.quantity.symbol.precision() == 0 ) return Number(ext_asset.quantity.amount);
    if ( !ext_asset.quantity.amount ) return 0;
    console.log(ext_asset.quantity.toString());
    return Number(ext_asset.quantity.amount) / (10 ** ext_asset.quantity.symbol.precision())
}

export function to_amount( ext_asset: ExtendedAsset, num: number ) {
    return BigInt(num * (10 ** ext_asset.quantity.symbol.precision()))
}

export function is_empty( ext_asset: ExtendedAsset ) {
    return Number(ext_asset.quantity.amount) == 0;
}
