import { getProvider } from '@decentraland/web3-provider'
import { getUserAccount } from '@decentraland/EthereumController'
import * as EthConnect from '../node_modules/eth-connect/esm'
import {abi} from '../contracts/mana'


executeTask(async () => {
   try {
      // Setup steps explained in the section above
      const provider = await getProvider()
      const requestManager = new EthConnect.RequestManager(provider)
      const factory = new EthConnect.ContractFactory(requestManager, abi)
      const contract = (await factory.at('0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb')) as any
      const address = await getUserAccount()
      log(address)

      // Perform a function from the contract
      const res = await contract.setBalance('0xaFA48Fad27C7cAB28dC6E970E4BFda7F7c8D60Fb', 100, {
        from: address
      })
      // Log response
      log(res)
    } catch (error) {
      log(error.toString())
    }
})