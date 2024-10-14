interface UtilVarType {
    baseUrl:string,
    code:string|number,
    noContentCode:number,
    ENC:boolean,//是否进行加密
}

const UtilVar:UtilVarType = {
    baseUrl:"",
    code:401, //登陆过期
    noContentCode:204, //请求成功但没有内容
    ENC:false,

}
const runtimeType:any = {
	//生產環境
    production: () => {
		UtilVar.baseUrl='https://83.229.126.125:80'

    },
    //開發環境
    development: () => {
        // UtilVar.baseUrl= `http://www.macautourism.top:19527`
		UtilVar.baseUrl='http://127.0.0.1:5000' //本地後端地址

    },
    hash:()=>{

    }
    
}
// console.log(import.meta.env)
runtimeType[import.meta.env.MODE]&&runtimeType[import.meta.env.MODE]()
console.log(`Running in mode: ${import.meta.env.MODE}`);
export default UtilVar