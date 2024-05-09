import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
//import backgroundImg from './img/shop-bg.png';

import './App.css';

function App() {

  //Public 폴더 안에 있는 파일들은 build 할때 압축되지 않아서 변형걱정없음 그래서 이미지 파일을 여따 넣는 것 임.
  //경로는 슬래쉬 부터 시작하고 넣으면 댐 
  //Public 폴더 이미지 사용하는 권장 방식  <img src={process.env.PUBLIC_URL + '/logo192.png'} /> 


  let [shoes] = useState(data);

  console.log()

  // 숙제 ~
  // 상품 div를 컴포넌트 화
  // 데이터 바인딩 해놓기 
  // map으로 반복문 돌리기 

  return (
    
    <div className="App">
      
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ZoomShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#home">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <div className='main-bg' style={{backgroundImage : `url(${backgroundImg})`}}></div> */}
      <div className='main-bg' style={{backgroundImage : `url(${process.env.PUBLIC_URL}/shop-bg.png)`}}></div>

      <Container>
      <Row>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/>
          <h4>{shoes[0].title}</h4>
          <p>{shoes[0].price}</p>
        </Col>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col>
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
      </Row>
    </Container>

    </div>
  );
}

export default App;
