import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import DetailPage from './pages/detail.js';
//import backgroundImg from './img/shop-bg.png';

import './App.css';

function App() {

  //Public 폴더 안에 있는 파일들은 build 할때 압축되지 않아서 변형걱정없음 그래서 이미지 파일을 여따 넣는 것 임.
  //경로는 슬래쉬 부터 시작하고 넣으면 댐 
  //Public 폴더 이미지 사용하는 권장 방식  <img src={process.env.PUBLIC_URL + '/logo192.png'} /> 


  let [shoes] = useState(data);
  let navigate = useNavigate(); //use가 붙어있는 함수는 훅임 유용한 것들이 들어있씀 ~

 

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

            </Row>
          </Container>
        } />

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
