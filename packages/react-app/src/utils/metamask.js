
export const getCurrentAddress = async () => {
    try {

        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log(account);
        return account;
        
    } catch (error) {
        console.log(error);
    }
}

export const getShortFormatAddress = address => (
    address.substring(0, 6) + '...' + address.substring(address.length - 4)
)