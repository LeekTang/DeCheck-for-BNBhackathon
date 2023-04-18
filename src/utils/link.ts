import Web3 from 'web3';

type ethAuth = {
    provider: any,
}
const provider: ethAuth = {
    provider: "",
}

export default {
    ...provider,
    // 链接
    connect: function () {
        if (window.ethereum) {
            return new Promise(async (resolve, reject) => {
                this.provider = new Web3(window.ethereum)
                window.ethereum.request({ method: 'eth_requestAccounts' }).then((res: any) => {
                    this.SwitchEthereumChainParameter();
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        } else {
            window.open('https://metamask.io/download/')
            return false;
        }
    },

    // 监听连接与网络变化
    change: function () {
        return new Promise(async (reslove, reject) => {
            window.ethereum.on('accountsChanged', (accounts: any) => {
                if(accounts.length == 0){
                    reslove(true)
                }else{
                    reject(false)
                }
            });        
        })
    },

    //添加/切换网络
    SwitchEthereumChainParameter: async function () {
        let id = Web3.utils.toHex(56)
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: id }]
            });
        } catch (error: any) {
            if (error.code == 4902) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: id,
                            chainName: 'Binance Smart Chain Mainnet',
                            rpcUrls: ['https://bsc-dataseed.binance.org'],
                            nativeCurrency: {
                                name: 'BNB',
                                symbol: 'BNB',
                                decimals: 18,
                            }
                        }
                    ]
                })
            }
        }
    },

    getSign(message = 'Welcome to DeCheck! Click to sign in and accept the DeCheck Terms of Service: https://decheck.io This request will not trigger a blockchain transaction or cost any gas fees.') {
        return new Promise(async (reslove, reject) => {
            // let accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            let accounts = await this.provider.eth.getAccounts()
            // this.provider.request({ method: 'personal_sign', params: [accounts[0], message] }).then ((res: any) => {
            this.provider.eth.personal.sign(message, accounts[0], (err: any, res: unknown) => {
                reslove({ signMessage: res, account: accounts[0] })
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}