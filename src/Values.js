import React, {Component} from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/fr';


class Values extends Component {
  constructor(props) {
    super(props);
    this.state = {
      influxData: false,
    };
  }

  render() {
    const values = this.props.values;
    const columns = this.props.columns;
    return (
  <ul className="list">
	      <li key='time'>Dernière mesure: {moment(values[0][values.length - 1]).format(('lll'))}</li>
	      {
                  columns.map((a, i) => {
                    if(a !== 'time') {
                      return (<li key={i}>{a}
                        : {values[values.length - 1][i]}
                      </li>)
                    }
                  })
                }</ul>

);
  }
}

export default Values;
