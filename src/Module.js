import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';
import Charts from './Charts';

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
    const values = this.state.influxData.values;
    const columns = this.state.influxData.columns;
    return (<div className="">
      {
        values
          ? <div className="module">
              <p><i className="fas fa-check check"></i>{this.props.name} connecté | {this.state.heure_actuelle}
                <br></br>
              <Charts data={values} valeurs={this.props.valeurs}></Charts> </p>
              <ul className="list">{
                  columns.map((a, i) => {
                    return (<li key={i}>{a}
                      : {values[values.length - 1][i]}
                    </li>)
                  })
                }</ul>
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
