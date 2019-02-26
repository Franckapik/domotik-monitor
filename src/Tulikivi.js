import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';
import Charts from './Charts';
import Values from './Values';

class Tulikvi extends Component {
  constructor(props) {
    super(props);
    console.log('oui');
  }
  render() {
    const values = this.props.values;
    return ('tulikvi');
  }
}

export default Tulikvi;
