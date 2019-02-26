import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';
import Charts from './Charts';
import Values from './Values';

class Meteo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const values = this.props.values;
    return (<ul className="values_list">
    <li><img alt='' src={values[values.length - 1][3]}></img></li>
       <li><h3> Actuellement</h3></li>
       <li><h4>Jardin</h4></li>
       <li key='current_hum' className="box_list"><i className="fas fa-tint"></i> {values[values.length - 1][1]}
          % </li>
        <li key='current_temp' className="box_list"><i className="fas fa-thermometer-three-quarters "></i>{values[values.length - 1][2]}
          ° C</li>
          <li><h4>Cabanon</h4></li>
          <li key='sensor_hum' className="box_list"><i className="fas fa-tint"></i>{values[values.length - 1][7]}
            % </li>
          <li key='sensor_temp' className="box_list"><i className="fas fa-thermometer-three-quarters "></i>{values[values.length - 1][8]}
            ° C </li>
          <li><h3>Demain</h3></li>
        <li key='next' className="box_list"><i className="fas fa-cloud-showers-heavy "></i>

       {values[values.length - 1][5]}
          - {values[values.length - 1][4]}
          ° C ({values[values.length - 1][6]}
          % pluie)</li>

      </ul>);
  }
}

export default Meteo;
