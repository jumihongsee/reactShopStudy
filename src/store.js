import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'




// 리덕스의 스테이트 변경하는 법
// 1. state 수정해주는 함수 만들고 
//    원할 때 그 함수 실행해달라고 store.js에 요청한다.

// 2. 스태이트 변경 함수들이 남음 그것을 export 해줌 

// 3. 만든 함수는 import 해서 사용  --> Cart.js




let stock = createSlice({
    name : 'stock', // 1. 스테이트 이름 작명
    initialState : [10,11,12] // 2. 실제 스테이트 값 넣기
})


//state 하나를 slice라고 부른다. 

let items = createSlice({
    
    name : 'items',
    initialState :
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        stockUp(state,action){
            // state.count += action.payload
            let item = state.find(item => item.id === action.payload.id);
            if(item){
                item.count += action.payload.amount;
            }
        },
        addItem(state, action){
            state.push(action.payload);
        }
    }
})

export let { stockUp, addItem } = items.actions




export default configureStore({
  reducer: { 
    
    // 3.reducer에 등록 후 사용 

    user :  user.reducer, //  4. 등록방법 : 변수 : 작명이름.reducer
    stock : stock.reducer,
    items : items.reducer

   }
}) 