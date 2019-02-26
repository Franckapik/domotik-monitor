import React, {Component} from 'react';
import './App.css';

class Measurements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      measurements: false
    };
  }

  connectDB() {
    (async() => {
      const measurements = await fetch('http://localhost:3001/measurements', {
        mode: "cors" // no-cors, cors, *same-origin
      });
      const data = await measurements.json();
      console.log(data);
      this.setState({
        measurements : data
      })
    })()
  }

  componentDidMount() {
    this.connectDB();
  }

  render() {
    return (<div className="measurements" >      <ul>
            {
              this.state.measurements
                ? this.state.measurements.map((a, i) => {
                  return (<li key={i} onClick={() => this.props.choix(a)}>{a}</li>)
                })
                : 'Aucune mesure est inscrite dans la base de donnée'
            }</ul>
            </div>);
  }
}

export default Measurements;
