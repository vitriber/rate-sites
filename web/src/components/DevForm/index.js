import React, {useState, useEffect} from 'react';

import './styles.css'

function DevForm({onSubmit}){
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
  
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
    
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 3000,
          }
        );
      }, [])

      async function handleSubmit(e){
        e.preventDefault(); 

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
          });

        setGithubUsername('');
        setTechs('');
      }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
              <label htmlFor="github_username">Link 1 Site</label>
              <input 
                name="github_username" 
                id="username_github" 
                required
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="techs">Link 2 Site</label>
              <input 
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div className="input-block">
                <label htmlFor="latitude">Nota performance</label>
                <input 
                  type="number" 
                  name="latitude" 
                  id="latitude" 
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">Comparar</button>
          </form>
    );
}

export default DevForm;