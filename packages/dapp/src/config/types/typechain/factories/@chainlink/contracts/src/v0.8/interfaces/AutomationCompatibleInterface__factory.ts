/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import type { Provider } from '@ethersproject/providers'
import type {
  AutomationCompatibleInterface,
  AutomationCompatibleInterfaceInterface,
} from '../../../../../../@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface'

const _abi = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'checkData',
        type: 'bytes',
      },
    ],
    name: 'checkUpkeep',
    outputs: [
      {
        internalType: 'bool',
        name: 'upkeepNeeded',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: 'performData',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'performData',
        type: 'bytes',
      },
    ],
    name: 'performUpkeep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export class AutomationCompatibleInterface__factory {
  static readonly abi = _abi
  static createInterface(): AutomationCompatibleInterfaceInterface {
    return new utils.Interface(_abi) as AutomationCompatibleInterfaceInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AutomationCompatibleInterface {
    return new Contract(address, _abi, signerOrProvider) as AutomationCompatibleInterface
  }
}
