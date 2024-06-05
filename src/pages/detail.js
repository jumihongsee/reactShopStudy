import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {  Nav, } from 'react-bootstrap';
import '../../src/App.css'
import { addItem } from "../store";

//import styled from 'styled-components'; 

// let YellowBtn =  styled.button `

//     background : ${ props => props.bg };
//     color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//     padding : 10px;

// `



function DetailPage(props){

    let [alert, setAlert] = useState(true); 
    let [count, setCount] = useState(0);
    let [num, setNum] = useState('')
    let [탭, 탭변경] = useState(0)

    let [fade, setFade] = useState(0)


    let {id} = useParams();
    // console.log(id) // 0
    // console.log(props.shoes[id].id) //2 아이디

    let 찾는상품 = props.shoes.find(function(x){
        return x.id == id
    });

    let a = useSelector((state)=>{return state.items})
    console.log(a)
    let dispatch = useDispatch();




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
        }, 2000);

        let fadeTimer = 
        setTimeout(()=>{
            setFade('end')
        },100)
        
        return ()=>{
            

            //useEffect가 실행이 되기전에 실행되는 코드 clean up function 
            // 기존 타이머는 제거해 주세여 
            clearTimeout(timer, fadeTimer)
            

        }



    },[ count ]) // useEffect 실행조건 넣을 수 있는 곳은 []


    useEffect(()=>{
        if(isNaN(num)== true){
            console.log('숫자가아님~')
        }
    }, [num])




   
    return(

        <div className={`container start ${fade}`}>
            {/* <Box></Box> */}
            {
                alert === true ? 
               <Alert/> : null 
            }
      
            <button onClick={()=> { setCount(count+ 1)}}>버튼{count}</button>
            <div className="row">
                <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${(props.shoes[id].id) + 1}.jpg`} width="100%" />
                    <InputNumber
                        setNum={setNum}
                    />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{찾는상품.title}</h4>
                <p>{찾는상품.content}</p>
                <p>{찾는상품.price}</p>
                <button className="btn btn-danger"
                    onClick={()=>{
                        dispatch(addItem({
                            id : 찾는상품.id,
                            name : 찾는상품.title,
                            count : 1
                        }))
                        console.log(찾는상품)
                    }}
                >주문하기</button> 
                {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭}></TabContent>
         


        </div> 

    )

}

function TabContent({탭}){ // props.가 귀찮으면 {} 중괄호안에 전송할 데이터를 ㄱㄱ
    
    let [fade, setFade] = useState('');


    useEffect(()=>{ // 탭에 변경이 있으면 end 라는 클래스를 붙여라 다만 0.1초뒤에 ㅋ
      let time =   setTimeout(()=>{
            setFade('end')
        },100)

        return ()=>{ // 탭에 변경이 없으면 공백으로 바꿔
            clearTimeout(time)
            setFade('')
        }

    }, [탭]) // 탭이라는게 변경될 떄마다 안의 코드 실행

    return (
        <div className={`start ${fade}`}>
          { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
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

function InputNumber({setNum}){
    return(
        <>
            <input
                type="text"
                onChange={(e)=>{setNum(e.target.value)}}
             ></input>
           
        </>
    )
}

export default DetailPage;