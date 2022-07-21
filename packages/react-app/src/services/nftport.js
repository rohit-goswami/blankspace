import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/accounts/0x4cA51F26c5B17351E939FD9c6fAdc60BBd6b7594', //you should add wallet address here from metamask
  params: {
    chain: 'ethereum',
    account_address: '0x4cA51F26c5B17351E939FD9c6fAdc60BBd6b7594', // add metamask address of logged in user
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