const state = {
    userStatus: false,
    merchantStatus: false
}

const getters = {
    getUserStatus(state) {
        return state.userStatus
    },
    getMerchantStatus(state) {
        return state.merchantStatus
    }
}

const mutations = {
    changeUserStatus(state, bool) {
        state.userStatus = bool
    },
    changeMerchantStatus(state, bool) {
        state.merchantStatus = bool
    }
}

const actions = {
    userStatusAction(context, bool) {
        context.commit('changeUserStatus', bool)
    },
    merchantStatusAction(context, bool) {
        context.commit('changeMerchantStatus', bool)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}