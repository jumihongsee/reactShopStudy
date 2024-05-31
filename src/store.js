import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'




// 리덕스의 스테이트 변경하는 법
// 1. state 수정해주는 함수 만들고 
//    원할 때 그 함수 실행해달라고 store.js에 요청한다.

// 2. 스태이트 변경 함수들이 남음 그것을 export 해줌 

// 3. 만든 함수는 import 해서 사용  --> Cart.js




let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let items = createSlice({
    
    name : 'items',
    initialState :
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        stockUp(state,action){
            state.count += action
        }
    }
})

export let { stockUp } = items.actions




export default configureStore({
  reducer: { 
    
    user :  user.reducer,
    stock : stock.reducer,
    items : items.reducer

   }
}) 