import router from "@/router";
import storage from "@/store/store";
import {HAS_LOGIN} from "@/store/constant";

function checkLogin(){
    return storage.get(HAS_LOGIN)
}

router.beforeEach(to=>{
    // 将Login页放到白名单里面
    if(to.name==='login')
        return true
    // 如果未登录
    if(!checkLogin()){
        return {name:'login'}
    }

})
