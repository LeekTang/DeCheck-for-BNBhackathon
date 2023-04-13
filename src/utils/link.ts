
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
                this.provider = window.ethereum
                // this.provider.enable().then((res: any) => {
                //     console.log(res)
                //     resolve(res)
                // }).catch((err: any) => {
                //     reject(err)
                // })
                this.provider.request({ method: 'eth_requestAccounts' }).then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            })
        } else {
            return false;
        }
    },

    getSign(message = 'Welcome to 2web3! Click to sign in and accept the 2web3 Terms of Service: https://2web3.vip This request will not trigger a blockchain transaction or cost any gas fees.') {
        return new Promise(async (reslove, reject) => {
            let accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            this.provider.request({ method: 'personal_sign', params: [accounts[0], message] }).then ((res: any) => {
                reslove({signMessage:res,account:accounts[0]})
            }).catch((err:any) => {
                reject(err)
            })
        })
    }
}