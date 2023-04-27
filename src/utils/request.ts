import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRuntimeConfig } from '../../node_modules/nuxt/dist/app'

// 配置新建一个 axios 实例
const service = axios.create({
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		const token=localStorage.token
		const language=localStorage.language||"zh"
		const con: any = config || {}
		if (token) {
			con.headers.token = token
		}
		//登录接口与其他接口不一样
		if(config.url == "/center/apis/user/user-login/login"){
			// con.baseURL=useRuntimeConfig().public.VITE_LOGIN_URL;
			con.baseURL = 'https://www.2web3.net/test-user-center';
		}else{
			// con.baseURL=useRuntimeConfig().public.VITE_API_URL;
			con.baseURL = "https://test.decheck.io/decheck-apis";
		}
		con.headers.language = language
		return con;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 200) {
			if(res.code==55557||res.code==60002){
				return res.msg
			}
			if(res.msg){
				ElMessage.error(res.msg)
			}
			return Promise.reject(res);
		} else {
			return res.data
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
