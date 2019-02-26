import React, {Component} from 'react';
import './App.css';


class ManageDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bdname: 'domotique',
      server: 'localhost',
      port: '8086',
      listdb: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.createDB = this.createDB.bind(this);
    this.deleteDB = this.deleteDB.bind(this);
    this.showDB = this.showDB.bind(this);

  }

  createDB(event) {
    const urlDB = 'http://' + this.state.server + ':' + this.state.port + '/query?q=CREATE DATABASE "' + this.state.bdname + '"';
    console.log(urlDB, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    });
    fetch(urlDB).then(response => response.json()).then(data => {
      if (data) {
        console.log('Erreur de la création de base de donnée', data.results);
      } else {
        console.log('Base de données', this.state.bdname, 'créée');
      }
    })
  }

  deleteDB(event) {
    const urlDB = 'http://' + this.state.server + ':' + this.state.port + '/query?q=DROP DATABASE "' + this.state.bdname + '"';
    console.log(urlDB, {method: 'POST'});
    fetch(urlDB).then(response => response.json()).then(data => {
      if (data) {
        console.log('Erreur de la suppression de base de donnée', data.results[0].messages[0].text);
      } else {
        console.log('Base de données', this.state.bdname, 'supprimée');
      }
    })
  }

  showDB() {
    const urlDB = 'http://' + this.state.server + ':' + this.state.port + '/query?q=SHOW DATABASES';
    setInterval(() => {
      fetch(urlDB).then(response => response.json()).then(data => {
        this.setState({listdb: data.results[0].series[0].values});
      })
    }, 2000);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    this.showDB();
  }

  componentWillUnmount() {}

  render() {

    return (<div className="">
      Création de la Base de donnée
      <hr></hr>
      Installation de Influx via shell
      <form onSubmit={this.handleSubmit}>
        <label>
          Nom de la base de donnée:
          <input type="text" name="bdname" value={this.state.bdname} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label>
          Adresse du serveur:
          <input type="text" name="server" value={this.state.server} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label>
          Port du serveur:
          <input type="text" name="port" value={this.state.port} onChange={this.handleChange}/>
        </label>
        <br></br>
        <button onClick={this.createDB}>Ajouter</button>
        <button onClick={this.deleteDB}>Supprimer</button>
      </form>
      <ul className="list">
        {
          this.state.listdb
            ? this.state.listdb.map((a, i) => {

              return (<li key={i}>{a}</li>)
            })
            : 'Pas de connexion au serveur'
        }</ul>
    </div>);
  }
}

export default ManageDB;
