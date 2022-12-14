import SigmaRust from 'ergo-lib-wasm-nodejs';

export async function encodeLongTuple(a: number | string, b: number | string): Promise<string> {
  if (typeof a !== 'string') a = a.toString();
  if (typeof b !== 'string') b = b.toString();
  return SigmaRust.Constant.from_i64_str_array([a, b]).encode_to_base16();
}

export function test() {
  return null;
}

export async function colTuple(
  a: ArrayBuffer | SharedArrayBuffer,
  b: ArrayBuffer | SharedArrayBuffer
): Promise<string> {
  return SigmaRust.Constant.from_tuple_coll_bytes(
    Buffer.from(a, 16),
    Buffer.from(b, 16)
  ).encode_to_base16();
}

export function encodeByteArray(reg: Uint8Array): string {
  return SigmaRust.Constant.from_byte_array(reg).encode_to_base16();
}

export async function decodeLongTuple(val: string): Promise<number[]> {
  return SigmaRust.Constant.decode_from_base16(val)
    .to_i64_str_array()
    .map(cur => parseInt(cur));
}

export function encodeNum(n: string, isInt = false): string {
  if (isInt) return SigmaRust.Constant.from_i32(+n).encode_to_base16();
  else
    return SigmaRust.Constant.from_i64(
      SigmaRust.I64.from_str((n as unknown) as string)
    ).encode_to_base16();
}

export async function decodeNum(n: string, isInt = false): Promise<string | number> {
  if (isInt) return SigmaRust.Constant.decode_from_base16(n).to_i32();
  else return SigmaRust.Constant.decode_from_base16(n).to_i64().to_str();
}

export function encodeHex(reg: string): string {
  return SigmaRust.Constant.from_byte_array(Buffer.from(reg, 'hex')).encode_to_base16();
}

function toHexString(byteArray: Iterable<unknown> | ArrayLike<unknown>): string {
  return Array.from(byteArray, function (byte: any) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

export async function decodeString(encoded: string): Promise<string> {
  return toHexString(SigmaRust.Constant.decode_from_base16(encoded).to_byte_array());
}
