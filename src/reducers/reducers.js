import { 
    TOGGLE_ROW,
    ADD_ROW,
    SET_SORT_FILTER,
    SortFilters 
} from '../actions/actions'
import { combineReducers } from 'redux'

const initialState = {
    sortFilter: SortFilters.SORT_NONE,
    rows: []
}

function rows(state = [], action) {
    switch (action.type) {
        case ADD_ROW:
            let row = action.row
            return [
                ...state,
                {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    email: row.email,
                    phone: row.phone,
                    description: row.description,
                    address: {
                        streetAddress: row.address.streetAddress,
                        city: row.address.city,
                        state: row.address.state,
                        zip: row.address.zip
                    },
                    details_show: false
                }
            ]
        case TOGGLE_ROW:
            return Object.assign({}, state, {
                rows: state.rows.map((row, index) => {
                    if (index === action.index) {
                        return Object.assign({}, row, {
                            details_show: !row.details_show
                        })
                    }
                    return row
                })
            })
        default:
            return state
    }
}



const tableApp = combineReducers({
    rows
})

export default tableApp