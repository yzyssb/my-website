const state = {
    userRouterIdx: 0,
    merchantRouterIdx:0,
}

const getters = {
    getUserRouterIdx(state) {
        return state.userRouterIdx
    },
    getMerchantRouterIdx(state) {
        return state.merchantRouterIdx
    }
}

const mutations = {
    changeIdx(state, num) {
        state.userRouterIdx = num
    },
    changeIdxMerchant(state, num) {
        state.merchantRouterIdx = num
    }
}

const actions = {
    changeIdxAction(context, num) {
        context.commit('changeIdx', num)
    },
    changeIdxActionMerchant(context, num) {
        context.commit('changeIdxMerchant', num)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}