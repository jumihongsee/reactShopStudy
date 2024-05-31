import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import DetailPage from './pages/Detail.js';
import axios, { Axios } from 'axios';
import Cart from './pages/Cart.js';


//import backgroundImg from './img/shop-bg.png';

import './App.css';

function App() {

  //Public 폴더 안에 있는 파일들은 build 할때 압축되지 않아서 변형걱정없음 그래서 이미지 파일을 여따 넣는 것 임.
  //경로는 슬래쉬 부터 시작하고 넣으면 댐 
  //Public 폴더 이미지 사용하는 권장 방식  <img src={process.env.PUBLIC_URL + '/logo192.png'} /> 


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //use가 붙어있는 함수는 훅임 유용한 것들이 들어있씀 ~
  let [buttonCount, setButtonCount] = useState(1);
  let [loading, setLoading] = useState(true)


  return (
    
    <div className="App">

      
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" onClick={()=>{ navigate('/') }}>ZoomShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to='/' style={{marginRight : '10px'}}>Home</Link>  */}
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            {/* <Nav.Link onClick={()=>{ navigate(1) }}>앞으로</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(-1) }}>뒤로</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      {/* <div className='main-bg' style={{backgroundImage : `url(${backgroundImg})`}}></div> */}
      <div className='main-bg' style={{backgroundImage : `url(${process.env.PUBLIC_URL}/shop-bg.png)`}}></div>
      
      <Routes>
        <Route path="/" element={     
         <Container>

            <Row>

              {
                shoes.map((a,i)=>{
                  return(
                    <Goods
                      i={i}
                      shoes={shoes}
                      navigate={navigate}
                    ></Goods>
                  )
                })
              }
              {
                loading === true ? <Loading></Loading> : null
              }
           

            <button onClick={()=>{
              setButtonCount(buttonCount + 1)
              console.log(buttonCount);
              if(buttonCount < 3){
                axios.get('https://codingapple1.github.io/shop/data3.json')

                .then((result)=>{

                  
                  //로딩중 UI  띄우기
                  setLoading(true)


                    let copyShoes = [...shoes]
                    // 혹은 let copy = [...shoes, ...result.data];
                    console.log(copyShoes);
                    let addShoes = copyShoes.concat(result.data);
                    setShoes(addShoes);
                    //로딩중 UI 숨기기  
                    setLoading(false)
                    // 응용 1. 버튼 2회 누를때는 7,8,9번 상품 가져오려면? // 유저가 버튼누른 횟수를 저장해놓으면 좋음 
                    
                    // 응용 2. 버튼을 3번 못 누르게 하는 방법은 ? 
  
                    // 응용 3. 버튼 누르면 로딩중입니다 글자 띄우기
  
  
                })
                .catch(()=>{
                  console.log('실패')
                  //로딩중 UI 숨기기  
                  setLoading(false)
  
                })
  
              }
              

             // ** 데이터를 보내고 싶으면 post
             // axios.post('URL',{name:'kim'})

             // ** 동시에 ajax 요청 여러개 하려면 ? 
            // Promise.all( [axios.get('URL1'), axios.get('URL2')] )

 


            }}>버튼</button>


            </Row>
          </Container>
        } />


        <Route path='/cart' element={ <Cart />} />


        {/* { 페이지를 여러개 만들고 싶으면?? url 파라미터 } */}
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} navigate={navigate} />}/>




        <Route path="*" element={<>없는 페이지입니다.(404)</>}/> {/* '*' : 이외에 모든 것 이라는 뜻 */}

        {/* Nested Routes 접속시엔 elment 2개나 보여줌
            /Nested된 엘리먼트들을 어디 보여줄지 정하려면 <Outlet> 사용
            /여러 유사한 페이지 필요할 때 사용 
        */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<>맴버임</>}/>
          <Route path="location" element={<>위치 정보임</>}/>
        </Route>

        <Route path='/event' element={<Event />}>
        <Route path="one" element={<>첫 주문시 양배추즙 서비스</>}/>
          <Route path="two" element={<>생일기념 쿠폰받기</>}/>
        </Route>


        {/* Nested Routes */}


        {/* 
        <Route path="/about/member" element={<About />}/>
        <Route path="/about/location" element={<About />}/> */}


        {/* <Route path="/about" element={<>어바웃페이지임</>}/> */}
      </Routes>



    </div>
  );
} // App() end



function Goods(props){

  return(
    
    <>
      <Col onClick={()=>{props.navigate(`/detail/${props.shoes[props.i].id}`)}}>
        <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%"/>
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].price}</p>
      </Col>
    </>
  )

}

function Loading(){
  
  return(
    <>
      <p>로딩중임</p>
    </>
  )
}

function About(){

  return(
    <>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </>
  )

}

function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  )
}




export default App;
