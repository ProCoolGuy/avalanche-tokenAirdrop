import logo from './logo.svg';
import './App.css';
import { useEtherBalance, useEthers, useTokenBalance } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import {utils} from 'ethers';
import {useState} from 'react';
import {useHolders, useContract, getHolders} from './api/hook';
import TOKEN_ABI from './abi/Mind.json';
import AIRDROP_CONTRACT_ABI from './abi/Airdrop.json';
import { holders } from './abi/wallets';
const TOKEN_ADDRESS = '0x9867cc2419Fb317e986A648E02cF7C35aa87a336';
// const TOKEN_ADDRESS = '0xD320B7d3C7fcF709ACcEBcf542C804E5282b255f';

// const AIRDROP_CONTRACT_ADDRESS = '0x837fc1E2aAd3800193b6FcFb8f6231d37d0ACF15';
const AIRDROP_CONTRACT_ADDRESS = '0x324233Bf26e6f00a5f374987283ce076647c855d';

export default function App() {
  const { activateBrowserWallet, account , library} = useEthers()
  const etherBalance = useEtherBalance(account);

  const tokenContract = useContract(TOKEN_ADDRESS, TOKEN_ABI, library && library.getSigner());
  console.log('tokenContract: ', tokenContract, library && library.getSigner());
  const airdropContract = useContract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_CONTRACT_ABI, library && library.getSigner());

  
  // const [holders, setHolders] = useState([]);
  const tokenBalance = useTokenBalance(TOKEN_ADDRESS, account);

  const airdrop = async () => {
    // let res = await tokenContract.approve(AIRDROP_CONTRACT_ADDRESS, tokenBalance);
    // let _holders = [...holders];
    // console.log('holders: ', _holders)
    // while(_holders.length > 0) {
    //   let _addresses = _holders.slice(0, 50);
    //   _holders = _holders.slice(50);
    //   await airdropContract.airdropTokens(account, _addresses);
    // }

    let sum = 0;
    for (let acc of holders) {
      sum += parseInt(acc.amount / (10**18));
    }
    console.log('sum: ', sum)
  }

  const getCurrentHolders = async () => {
    let _holders = await getHolders(tokenContract);
    // setHolders(_holders);
    // let _holders = [
    //   {
    //     account: '0x5DB342FB039C1c85bec5fE89Af6734621f421D84',
    //     amount: '8199999999999999000'
    //   },
    //   {
    //     account: '0xc09eAC15f9Ba6462e8E4612af7C431E1cfe08b87',
    //     amount: '8199999999999999000'
    //   },
    //   {
    //     account: '0x94Da7d3d5f83a7253a2B96427D69C971a4bac6dF',
    //     amount: '8199999999999999000'
    //   },
    //   {
    //     account: '0x27a6Eb91d04FE0133859695D8D40c44Cc8B77c28',
    //     amount: '8199999999999999000'
    //   },
    // ]
    // setHolders(_holders);

  }

  return (
    <div>
      <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        {/* <button onClick={() => getCurrentHolders()}>Get Current Holders</button> */}
        <button onClick={() => airdrop()}>AirDrop</button>
      </div>
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}

    </div>
  )
}