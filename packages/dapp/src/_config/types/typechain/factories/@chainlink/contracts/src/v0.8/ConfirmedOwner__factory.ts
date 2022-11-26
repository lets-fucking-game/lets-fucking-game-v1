/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { PromiseOrValue } from '../../../../../common'
import type {
  ConfirmedOwner,
  ConfirmedOwnerInterface,
} from '../../../../../@chainlink/contracts/src/v0.8/ConfirmedOwner'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b506040516104ef3803806104ef83398101604081905261002f9161016e565b8060006001600160a01b03821661008d5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b03848116919091179091558116156100bd576100bd816100c5565b50505061019e565b336001600160a01b0382160361011d5760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c660000000000000000006044820152606401610084565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b60006020828403121561018057600080fd5b81516001600160a01b038116811461019757600080fd5b9392505050565b610342806101ad6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806379ba5097146100465780638da5cb5b14610050578063f2fde38b1461007c575b600080fd5b61004e61008f565b005b6000546040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b61004e61008a3660046102cf565b610177565b60015473ffffffffffffffffffffffffffffffffffffffff1633146100fb5760405162461bcd60e51b815260206004820152601660248201527f4d7573742062652070726f706f736564206f776e65720000000000000000000060448201526064015b60405180910390fd5b60008054337fffffffffffffffffffffffff00000000000000000000000000000000000000008083168217845560018054909116905560405173ffffffffffffffffffffffffffffffffffffffff90921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b61017f61018b565b610188816101f4565b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101f25760405162461bcd60e51b815260206004820152601660248201527f4f6e6c792063616c6c61626c65206279206f776e65720000000000000000000060448201526064016100f2565b565b3373ffffffffffffffffffffffffffffffffffffffff8216036102595760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016100f2565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b6000602082840312156102e157600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461030557600080fd5b939250505056fea26469706673582212205a8e0720e946680a47390094d03962f1bb8e70e421788f906dfb031efeddea2d64736f6c63430008100033'

type ConfirmedOwnerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: ConfirmedOwnerConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class ConfirmedOwner__factory extends ContractFactory {
  constructor(...args: ConfirmedOwnerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ConfirmedOwner> {
    return super.deploy(newOwner, overrides || {}) as Promise<ConfirmedOwner>
  }
  override getDeployTransaction(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(newOwner, overrides || {})
  }
  override attach(address: string): ConfirmedOwner {
    return super.attach(address) as ConfirmedOwner
  }
  override connect(signer: Signer): ConfirmedOwner__factory {
    return super.connect(signer) as ConfirmedOwner__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): ConfirmedOwnerInterface {
    return new utils.Interface(_abi) as ConfirmedOwnerInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ConfirmedOwner {
    return new Contract(address, _abi, signerOrProvider) as ConfirmedOwner
  }
}
