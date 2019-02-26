import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';
import Charts from './Charts';
import Values from './Values';

class Jardin extends Component {
  constructor(props) {
    super(props);
    console.log('oui');
  }
  render() {
    const values = this.props.values;
    return (<ul className="list">
    <li>ESSAI</li>
        <li key='time'>{moment(values[values.length - 1][0]).format(('lll'))}</li>
       <li key='current_hum'><i className="fas fa-tint"></i> {values[values.length - 1][1]}
          % hum</li>
        <li key='current_temp'><i className="fas fa-thermometer-three-quarters "></i>{values[values.length - 1][2]}
          ° C</li>
        <li key='imageUrlskytext'>
          <img alt='' src={values[values.length - 1][3]}></img>
          {values[values.length - 1][10]}</li>
        <li key='next'><i className="fas fa-cloud-showers-heavy "></i>{values[values.length - 1][5]}
          ° C / {values[values.length - 1][4]}
          ° C / {values[values.length - 1][6]}
          % pluie demain</li>
        <li key='sensor_hum'><i className="fas fa-tint"></i>{values[values.length - 1][7]}
          % hum rpi</li>
        <li key='sensor_temp'><i className="fas fa-thermometer-three-quarters "></i>{values[values.length - 1][8]}
          ° C rpi</li>
      </ul>);
  }
}

export default Jardin;
