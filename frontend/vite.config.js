import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:5001",
			},
		},
	},
});
/**
 //代理配置了"/api"路径，指向了"http://localhost:5001"这个目标服务器。
 //这意味着，当前端应用发起对"/api"路径的请求时，
 //Vite服务器会自动将这个请求转发到"http://localhost:5001"上，
 //而不是直接向本地的服务器发送请求。
 */
/** 
 //这种配置通常用于前后端分离的开发环境中。
 //后端服务器通常运行在另一个端口上，而前端服务器用于提供静态资源和响应前端的请求。
 //为了避免跨域问题，我们需要配置代理来将前端的请求转发到后端的服务器上。
 //这样，前端应用就可以在开发环境中像访问本地服务器一样访问后端服务器。
 */

