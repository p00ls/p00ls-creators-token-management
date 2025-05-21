import {Address} from "../../domain";

export interface Signature {
  address: Address;
  signature: string;
  message: string;
}
