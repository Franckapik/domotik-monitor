import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';
import Charts from './Charts';
import Values from './Values';
import Meteo from './Meteo';
import Jardin from './Jardin';
import Tulikivi from './Tulikivi';
import Solaire from './Solaire';
import Linky from './Linky';

class Module extends Component {
  constructor(props) {
    super(props);
    this.state = {
      influxData: false,
      heure_actuelle: false
    };
  }

  getData() {
    fetch('http://localhost:3001/db?name=' + this.props.name + '&limit=' + this.props.limit).then(response => response.json()).then(data => {
      this.setState({influxData: data});
    })
  }

  getTime() {
    setInterval(() => {
      this.setState({
        heure_actuelle: moment(Date.now()).format(('lll'))
      })
    }, 1000);
  }

  componentDidMount() {
    this.getData();
    this.getTime();
  }

  componentWillUnmount() {
  }

  render() {
    const NameModule = this.props.name.charAt(0).toUpperCase()+ this.props.name.substring(1).toLowerCase();
    console.log(NameModule);
    var listeComp = {
      meteo: Meteo,
      linky: Linky,
      solaire: Solaire,
      tulikivi: Tulikivi,
      jardin: Jardin
  }
  var ChildComponent = listeComp[this.props.name];

    return (<div className="">
      {
        this.state.influxData.values
          ?<div> <div className="module">
              <p><i className="fas fa-check check"></i>{this.props.name} connecté | {this.state.heure_actuelle}
                <br></br>
              <Charts data={this.state.influxData.values} valeurs={this.props.valeurs}></Charts> </p>
              <ChildComponent values={this.state.influxData.values} columns={this.state.influxData.columns} />
            </div>
            <Values values={this.state.influxData.values} columns={this.state.influxData.columns}></Values>
</div>

          : <span>
              <i className="fas fa-times wrong"></i>
              {this.props.name}
              déconnecté</span>
      }
    </div>);
  }
}

export default Module;
