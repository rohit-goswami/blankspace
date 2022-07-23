import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/accounts/0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', //you should add wallet address here from metamask
  params: {
    chain: 'ethereum',
    account_address: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', // add metamask address of logged in user
    page_size: '5',
    include: 'metadata'
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: '75c1d88f-0132-4093-b034-c08530c17ced' //75c1d88f-0132-4093-b034-c08530c17ced 
  }
};

export const run = () => {
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}