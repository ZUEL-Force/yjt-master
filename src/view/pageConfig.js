import storage from "@/store/store";
import {HAS_LOGIN, USER_INFO} from "@/store/constant";
import router from "@/router";

export const route = {
    problem: {
        title: '试题管理', key: 'problem'
    }, paper: {
        title: '试卷管理',  key: 'paper'
    }, user: {
        title: '用户管理', key: 'user'
    }
}


export const user={
    name:'User',
    phone:'123456',
    id:undefined,
    userInfo:undefined
}

export const userAvatar=[
    require('@/assets/user.png'),
    require('@/assets/user_1.png'),
    require('@/assets/user_2.png'),
    require('@/assets/user_3.png'),
    require('@/assets/user_4.png'),

]


export const tags=[
    {text: '算法', value: 0},
    {text: '后端', value: 1},
    {text: '前端', value: 2},
    {text: '测试', value: 3},
    {text: '运维', value: 4},
    {text: '计算机网络', value: 5},
    {text: '操作系统', value: 6},
    {text: '数据库', value: 7},
    {text: '其他', value: 8},
]

export const colorTagMap={
    1: 'blue',
    2: 'orange',
    3: 'green',
    4: 'blue',
    5: 'orange',
    6: 'green',
    7: 'blue',
    8: 'orange',
    0: 'green',
}

export  const getTags=(tag)=>{
    let r= tags.find(i=>{
        return i.value===tag
    })
    return r.text
}


export function resetUserState(){
    storage.remove(HAS_LOGIN)
    storage.remove(USER_INFO)
    router.go(0)
}
