import React, {useEffect, useState} from 'react';
import api from './services/api'


import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import SiteForm from './components/SiteForm'
import SiteItem from './components/SiteItem'


// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente pai passa o componente filho
// Estado: Informações mantidas pelo componente (imutabilidade)

function App() {
const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev (data){
  
    const response = await api.post('/devs',data)

    setDevs([...devs, response.data]);

  }

  return(
    <div id="app">
      <aside>
        <strong>Rockstage</strong>
        <SiteForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <SiteItem key={dev._id} dev={dev} />
          ))}         
        </ul>
      </main>
    </div>

  );
}

export default App;
