import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim' , age : 20},
    reducers : {
        // 리덕스의 스테이트 변경하는 법
        // 1. state 수정해주는 함수 만들고 
        //    원할 때 그 함수 실행해달라고 store.js에 요청한다.
        agePlus(state, action){
            state.age +=  action.payload // payload 를 붙여야 파라미터가 자리에 제대로 들어옴
                          // state 변경함수를 action 이라고도 함  
        },
    }
})

export let { changeName, agePlus } = user.actions

export default user