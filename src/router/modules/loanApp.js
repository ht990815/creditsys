const loanApp = {
    path: '/loanapp',
    name: 'loanapp', // 贷款申请
    redirect: "/loanapp/prereview",
    meta: {
        roles: ['approve']
    },
    component: () => import('@/views/LoanApproval/Index.vue'),
    children: [
        {
            path: '/loanapp/prereview',
            name: 'prereview',
            component: () => import('@/views/LoanApproval/PreReview.vue'),
            meta: {
                title: "初审"
            }
        },
        {
            path: '/loanapp/finreview',
            name: 'finreview',
            component: () => import('@/views/LoanApproval/FinReview.vue'),
            meta: {
                title: "终审"
            }
        }
    ]
}
export default loanApp;