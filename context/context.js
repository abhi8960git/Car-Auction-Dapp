import { createContext, useContext, useMemo } from "react";
import {BN} from '@project-serum/anchor';
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";


import{
  getLotteryAddress,
  getMasterAddress,
  getProgram,
  getTicketAddress,
  getTotalPrize,

}from '../utils/program';

import {confirmTx, mockWallet} from '../utils/helper'
import toast from 'react-hot-toast';



export const AppContext = createContext();
export const AppProvider = ({ children }) => {

  // get provider 

  const {connection} = useConnection();
  const wallet = useAnchorWallet();
  const program = useMemo(() => {
    if(connection)
      return getProgram(connection, wallet ?? mockWallet());

  }, [connection, wallet]);
  

  return (
    <AppContext.Provider
      value={{
        connected: wallet ?.publicKey ? true :false
        // Put functions/variables you want to bring out of context to App in here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
