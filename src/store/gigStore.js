// import gigService from '../service/gigService.js'
import gigService from '../service/gigDemoService.js'
export default {
    state: {
        gigs: [],
        currGig:{

        }
    },
    getters: {
        gigs(state) {
            return state.gigs
        }
    },
    mutations: {
        setGigs(state, {gigs}) {
            state.gigs = gigs
        }
    },
    actions: {
        getGigs(context,{category}) {
            gigService.query(category)
                .then(gigs => context.commit({type: 'setGigs', gigs}))
        },
        getGigById(context){
            console.log('got to store')
            console.log(context)
            gigService.getById()
                .then(res => console.log(res))
        }
    },
}