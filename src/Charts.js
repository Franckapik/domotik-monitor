import React, { Component } from 'react';
import './App.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import 'moment/locale/fr';

class Charts extends Component {

  formatXAxis(tickItem) {
    moment.locale('fr')
    return moment(tickItem).format(('lll'));
  }

  render() {
    return (
        <ResponsiveContainer width={800} height={300}>
          <LineChart data={this.props.data} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey='[0]' tickFormatter={this.formatXAxis} name='Temps' tick={{
                fontSize: '0.5em'
              }}/>
            <YAxis tick={{
                fontSize: '0.5em'
              }}/>
            <Tooltip/>
            {this.props.valeurs? this.props.valeurs.map((name, i) => {
              return (
                <Line key={i} type="monotone" name={name} dataKey={[i+1].toString()} stroke="#8884d8" strokeWidth={1}/>
              )
            }):null}
          </LineChart>
        </ResponsiveContainer>
    );
  }
}

export default Charts;
