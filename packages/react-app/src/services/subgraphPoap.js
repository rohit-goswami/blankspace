import { createClient } from 'urql';

const APIURL = 'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/3wrR9hnVGJvVhgdBsTywu9Xnu5sntVKWwphuossQmuV8';
const query = `{
  tokens(first: 5) {
    id
    owner {
      id
    }
    event {
      id
    }
    transfers {
      id
    }
  }
  accounts(first: 5) {
    id
    tokens {
      id
    }
    tokensOwned
  }
}
`;

const client = createClient({
    url: APIURL,
});

async function fetchData() {
    const response = await client.query(query).toPromise();
    console.log('response:', response);
}
