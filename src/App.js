import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Module from './Module';
import Measurements from './Measurements';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: '',
      limit : '100'
    }
    this.choixModule = this.choixModule.bind(this);
  }

  choixModule(module) {
    this.setState({module: module})
  }

  handleChange = (e)=>{
   this.setState({limit : e.target.value});
 }

  componentDidMount() {
  }

  render() {
    return (
      <div className="main">
        <div className="header">  <img src={logo} className="App-logo" alt="logo"/>
          Moniteur Domotik

        <span className="range">{this.state.limit}
          <input type="range" min="1" max="1000"  onChange={this.handleChange}></input>
          </span>
        </div>

          <Measurements choix={this.choixModule}></Measurements>


          {
            this.state.module === 'meteo'
              ? <Module name="meteo" limit={this.state.limit} valeurs={['humidité', 'temperature']}></Module>
              : null
          }
          {this.state.module === 'linky' && <Module name="linky" limit={this.state.limit} valeurs={['consoHeure', 'hchc', 'hchp', 'puissance_w']}></Module>}
          {
            this.state.module === 'solaire' && <Module name="solaire" limit={this.state.limit} valeurs={[
                  'capacite_batterie',
                  'conso_auj ',
                  'conso_mois',
                  'conso_totale',
                  'courant_charge',
                  'current_hum',
                  'current_temp,',
                  'ensoleillement',
                  'produite_auj',
                  'produite_mois ',
                  'produite_totale '
                ]}></Module>
          }
          {this.state.module === 'jardin' && <Module name="jardin" limit={this.state.limit} valeurs={['hauteur_cuve', 'remplissage']}></Module>}
          {this.state.module === 'tulikivi' && <Module name="tulikivi" limit={this.state.limit} valeurs={['temperature']} strong={['temperature']}></Module>}


      </div>);
  }
}

export default App;
