import axios from "axios";

var options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/accounts/<User Wallet address>', //you should add wallet address here from metamask
  params: {
    chain: 'ethereum',
    account_address: '<user wallet address>', // add metamask address of logged in user
    page_size: '5',
    include: 'metadata'
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'NFT_PORT_APIKEY' //75c1d88f-0132-4093-b034-c08530c17ced 
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});