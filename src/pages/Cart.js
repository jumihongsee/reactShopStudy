import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {  agePlus } from "./../store/userSlice.js"
import { stockUp } from "./../store.js"

function Cart(){
          //useSelctor : store의 state를 가져와 주는 함수. 
    let a = useSelector((state)=>{return state }) 
    let itemsStore = useSelector((state)=>{return state.items})

    //  갖고오고 싶은 스테이트만 갖고 올 수도 있음
    //  let a = useSelector((state)=>{return state.stock })
    // 간단한것들은 props로 컴포넌트가 많으면 리덕스로 





    // 4. 스테이트 변경 하기 : store.js로 요청을 보내주는 함수 
    let dispatch = useDispatch();

    return(
      
        <div>
            <p>{a.user.name}의 장바구니 <br/> 그는{a.user.age}살임</p>
            <button
                onClick={()=>{dispatch(agePlus(200))}}
            >버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                {
                    itemsStore.map((a, i)=>{
                        return(
                            <tbody>
                                <tr key={i}>
                                <td>{itemsStore[i].id}</td>
                                <td>{itemsStore[i].name}</td>
                                <td>{itemsStore[i].count}</td>
                                <td><button onClick={()=>{
                         
                                        dispatch(stockUp({
                                            id: a.id,
                                            amount : 1
                                        }))                              
                                    }}>+</button></td>
                            </tr>
                        </tbody>
                        )

                    })
                }

            </Table> 
        </div>

    )
    

}

export default Cart