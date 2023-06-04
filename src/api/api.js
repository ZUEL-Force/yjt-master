import {get, post} from "@/api/config";



// 用户模块接口

export function login(data) {
    return post(data, '/user/login')
}

export function logout() {
    return post({}, '/user/logout')
}

export function deleteUser(id) {
    return post({id:id}, '/user/delete')
}


export function myInfo() {
    return get({}, '/user/current')
}

export function searchUser(userName) {
    return post({userName: userName}, '/user/search')
}


export function getUserList(){
    return post({},'user/getAllUser')
}


// 题目模块接口

export function pageProblem(data){
    return post(data,'/problem/pageProblem')
}



export function  addProblem(data){
    return post(data,'/problem/addProblem')
}

export function deleteProblem(data){
    return post(data,'/problem/deleteProblem')
}


export function searchProblem(data){
    return post(data,'/problem/searchProblem')
}


// 试卷相关接口



export function getPaper(data){
    return post(data,'/paper/pagePaper')
}


export function addPaper(data){
    return post(data,'/paper/addPaper')
}


export function getPaperProblem(data){
    return post(data,'/paper/getPaperProblem')
}


export function delPaper(data){
    return post(data,'/paper/delPaper')
}


export function pagePaper(data){
    return post(data,'/paper/pagePaper')
}


export  function  searchPaper(data){
    return post(data,'paper/searchPaper')
}
