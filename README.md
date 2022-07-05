# Typescript Backend Developer

Hello young padawan, welcome to this Typescript technical test.  
As backend developer, the main purpose of this test is to prove that you can create and interact with APIs, but also
to see your ability to think and adapt.

## Introduction

Your job today will be to expose an API with express that will manage three endpoints:
 - `GET /rot13?message="xxx"` rot13 the message
 - `GET /kucoin/:TOKEN` to get the balance on Kucoin for the given token
 - `GET /ethereum/:ADDRESS` to get the ethereum balance on the ethereum blockchain for the given address 

## Rot13

First, let's do little algorithmic work, inside a little enigma :
 - You have to find yourself what the endpoint `GET /rot13?message="xxx"` should do (google it).
 - Clue: Only alphabetical characters should be impacted.
 - Decode the sentence: `Pbatenghyngvba, lbh'er ba gur tbbq jnl gb wbva Chyfne NV !` to verify your code.

## Kucoin

For Kucoin, you will work with the testnet available at this URL: `https://openapi-sandbox.kucoin.com/`  
The API key, secret & passphrase has been sent to you by email.  
The challenge will be to implement the signature process that Kucoin use to manage authentication on their API,
more info here : https://docs.kucoin.com/#authentication  

Rules:
 - You have to use axios to access the API (any helper library like `kucoin-node-api` is forbidden).
 - Manage the authentication & signing process for kucoin API inside an axios interceptor on a dedicated axios instance.
 - The endpoint `GET /kucoin/:TOKEN` should return a JSON with this format `{ balance: "xx.xx" }`, you have to group all balances
   available for this token across all kucoin accounts (main account, trading account...).
 - If the token provided in parameter doesn't exists in any of the kucoin account, the endpoint should 
   return `{ error: "There is no balance for token XXX" }` with a relevant HTTP status code.
 
## Ethereum

For Ethereum, you should use the library `ethers` to access the blockchain (you can use a public RPC like `https://rpc.ankr.com/eth`).

Rules:
 - Use `ethers` library to access the blockchain.
 - The endpoint `GET /ethereum/:ADDRESS` should return an error with a relevant HTTP code if the address isn't valid.
 - Else the endpoint should return a JSON with this format `{ balance: "xx.xx" }` (not that balance are inside a string, in decimal format).

## Other requirements

- All library you need is already present, you may not use any other library. If you really need another library, please explain your choice in comments.
- You have to use yarn package manager instead of npm.
- You should provide a script `yarn start` in the package json to start the server.
- All your code have to be in typescript.
- All your code have to live in the `src` folder, and the entrypoint is `index.ts`.
- The server should run on port 8000.

Good luck !

# Send us your work

In order to not influence others candidates, send us a zip of your solution.  
If the zip is too large for an email you can use https://wetransfer.com/ or any other service.
