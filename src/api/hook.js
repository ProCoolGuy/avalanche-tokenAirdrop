import { useEthers } from "@usedapp/core"
import { Contract, BigNumber, utils } from "ethers"
import {useMemo, useEffect, useState} from 'react'
import TOKEN_ABI from '../abi/Mind.json';
const TOKEN_ADDRESS = '0x9867cc2419Fb317e986A648E02cF7C35aa87a336';

export function getContract(address, ABI, signer) {
  return new Contract(address, ABI, signer);
}

export function useContract(address, ABI, signer) {
  return useMemo(() => {
    if (!address || !ABI || !signer) return null
    try {
      return getContract(address, ABI, signer)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [signer])
}

export async function getEvents(tokenContract) {
    console.log('contract: ', tokenContract)
    let events = [];
    if (tokenContract) {
      let eventFilter = tokenContract.filters.Transfer() 
      events = await tokenContract.queryFilter(eventFilter, 10841421);
    }

    return events
}

export function useHolders(tokenContract) {

  const [holders, setHolders] = useState([]);

  useEffect(() => {
    const getHolders = async () => {
      const events = await getEvents(tokenContract);
      console.log('txs: ', events);

      let _holders = [];
      for (let event of events) {

        const {to} = event.args;

        if (_holders.indexOf(to) === -1) {
          let balance = await tokenContract.balanceOf(to);
          if (parseInt(utils.formatEther(balance.toBigInt())) > 0) {
            _holders.push(to);
            console.log('holders: ', _holders);
          }
        }
      }
      setHolders(_holders);
    }
    if (tokenContract) {
      getHolders();
    }
  }, [tokenContract]) 


  return holders;
}

function isExist(array, address) {
  for (let instance of array) {
    if (instance.account == address) {
      return true;
    }
  }
  return false;
}

export async function getHolders(tokenContract) {
  if (!tokenContract) return []
  const events = await getEvents(tokenContract);
  console.log('txs: ', events);

  let holders = [];
  for (let event of events) {

    const {to} = event.args;

    if (!isExist(holders, to)) {
      let nodeBalance = await tokenContract.getNodeNumberOf(to);
      console.log('nodeBalance: ', nodeBalance.toNumber())
      if (nodeBalance.toNumber() > 0) {
        let rewardsAmount = nodeBalance.toNumber() * 4 * 0.9 + 1;
        let amount = rewardsAmount * (10 ** 18);
        holders.push({
          account: to,
          amount: amount.toString()
        });
        console.log('holders: ', holders);
      }
    }
  }

  return holders;
}