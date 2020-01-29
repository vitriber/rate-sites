import React, {useEffect, useState, Text} from 'react';
import api from './services/api'



import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import {Container, Row, Col, Image} from 'react-bootstrap';

import SiteForm from './components/SiteForm'
import SiteItem from './components/SiteItem'

function App() {
const [sites, setSites] = useState([]);

  useEffect(() => {
    async function loadSites(){
      const response = await api.get('sites');

      setSites(response.data);
    }

    loadSites();
  }, []);

  async function handleAddSites (data){
  
    const response = await api.post('/links',data)

    setSites([...sites, response.data]);

  }

  return(
    <Container fluid>
    
      <Col className="p-3"></Col>
      <Image src= "../logo-stage.png" width="150px" className="rounded mx-auto d-block"/> 
      <Col className="p-3"></Col>
      <Col xs="6" sm="4" className="rounded mx-auto d-block text-center">
          <strong>COMPARADOR DE SITES</strong>
      </Col>
    
      <Row>
          <SiteForm onSubmit={handleAddSites}/>
      </Row>
    </Container>
  );
}

export default App;
