import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import styled from 'styled-components'; 

// let YellowBtn =  styled.button `

//     background : ${ props => props.bg };
//     color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//     padding : 10px;

// `



function DetailPage(props){

    let [alert, setAlert] = useState(true); 
    let [count, setCount] = useState(0);

    let {id} = useParams();
    // console.log(id) // 0
    // console.log(props.shoes[id].id) //2 아이디

    let 찾는상품 = props.shoes.find(function(x){
        return x.id == id
    });


    useEffect(()=>{
        // useEffect안에 있는 코드는 html 렌더링이 다 되고 나서 실행이 된다 => html을 먼저 보여주기 때문에 효율적!
        // mount , update시 실행
        // 어따써요?
        // 1. 어려운 연산 같은것들
        // 2. 서버에서 데이터 가져오는 작업
        // 3. 타이머 장착 등 
        let timer = 
        setTimeout(()=>{
            setAlert(false)
        }, 2000)
        
        return ()=>{
            

            //useEffect가 실행이 되기전에 실행되는 코드 clean up function 
            // 기존 타이머는 제거해 주세여 
            clearTimeout(timer)
            

        }

    },[ count ]) // useEffect 실행조건 넣을 수 있는 곳은 []






   
    return(

        <div className="container">
            {/* <Box></Box> */}
            {
                alert === true ? 
               <Alert/> : null 
            }
      
            <button onClick={()=> { setCount(count+ 1)}}>버튼{count}</button>
            <div className="row">
                <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${(props.shoes[id].id) + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{찾는상품.title}</h4>
                <p>{찾는상품.content}</p>
                <p>{찾는상품.price}</p>
                <button className="btn btn-danger">주문하기</button> 
                {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
           
             
                </div>
            </div>
        </div> 

    )

}

function Alert(){

    return(      
        <div className="alert alert-warning">
            2초이내 구매시 할인
        </div>
    )
}

export default DetailPage;