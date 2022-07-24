
export const getCurrentAddress = async () => {
    try {

        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
        
    } catch (error) {
        console.log(error);
    }
}

export const getShortFormatAddress = address => (
    address.substring(0, 6) + '...' + address.substring(address.length - 4)
)