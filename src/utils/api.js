import request from "./request"

// 登录
export function LoginFn(data) {
    return request({
        method: "post",
        url: "/user/login",
        data
    })
}

// 获取用户详情
export function getInfo(token) {
    return request({
        method: "get",
        url: "user/info",
        params: { token }
    })
}

// 退出
export function LoginOutFn() {
    return request({
        method: "post",
        url: "user/logout"
    })
}

// 贷款申请
export function LoanInput(data) {
    return request({
        method: "post",
        url: "loan/create",
        data
    })
}

// 申请管理
export function LoanList(data) {
    return request({
        method: "get",
        url: "loan/list",
        params: data
    })
}

// 申请管理-编辑
export function Edit(data) {
    return request({
        method: "put",
        url: "loan/update",
        data
    })
}

// 申请管理-删除
export function DeleteItem(data) {
    return request({
        method: "delete",
        url: "loan/delete/" + data.id
    })
}

// 申请管理-提交审核
export function submitToApprove(data) {
    return request({
        method: "post",
        url: "loan/submitToApprove",
        data
    })
}

// 贷款审批-初审
export function ApproveFirstList(data) {
    return request({
        method: "get",
        url: "approve/first/list",
        params: data
    })
}

// 贷款审批-查看详情
export function AppQueryInfo(data) {
    return request({
        method: "get",
        url: "loan/query?id=" + data.loan_id
    })
}

// 贷款审批-初审通过
export function ApproveFirstPass(data) {
    return request({
        method: "post",
        url: "approve/first/pass",
        data
    })
}

// 贷款审批-初审拒绝
export function ApproveFirstReject(data) {
    return request({
        method: "post",
        url: "approve/first/reject",
        data
    })
}

// 贷款审批-获取列表
export function AppFinalList(data) {
    return request({
        method: "get",
        url: `approve/end/list?pageNo=${data.pageNo}&pageSize=${data.pageSize}&name=${data.name}`
    })
}

// 贷款审批-终审-获取详情
export function AppFinalInfo(id) {
    return request({
        method: "get",
        url: `loan/query?id=${id}`
    })
}

// 贷款审批-终审-通过
export function AppFinalPass() {
    return request({
        method: "post",
        url: `approve/end/pass`
    })
}

// 贷款审批-终审-拒绝
export function AppFinalReject() {
    return request({
        method: "post",
        url: `approve/end/reject`
    })
}


// 标的管理
export function ContractList(data) {
    let { pageNo, pageSize, name } = data;
    return request({
        method: "get",
        url: `contract/list?pageNo=${pageNo}&pageSize=${pageSize}&name=${name}`
    })
}

// 标的管理-生成合同
export function CreateFile(data) {
    return request({
        method: "post",
        url: "contract/createFile",
        data
    })
}

// 标的管理-下载合同
export function DownloadFile(data) {
    return request({
        method: "get",
        url: "contract/download?id=" + data.id
    })
}

// 创建管理员
export function CreateUser(data) {
    return request({
        method: 'post',
        url: 'permission/createUser',
        data
    })
}

// 列表展示
export function Userlist() {
    return request({
        method: 'get',
        url: 'user/list',
    })
}