import { Component } from "react";
import "./styles.css";
const url = "https://zomatoajulypi.herokuapp.com/location";
const restUrl = "https://zomatoajulypi.herokuapp.com/restaurant?stateId=";

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      restaurants: ""
    };
  }
  renderCity = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option value={item.state_id} key={item.state_id}>
            {item.state}
          </option>
        );
      });
    }
  };
  renderRestaurants = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option value={item.restaurant_id} key={item.restaurant_id}>
            {item.restaurant_name}
          </option>
        );
      });
    }
  };
  handleChange = (event) => {
    let stateid = event.target.value;
    fetch(`${restUrl}${stateid}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ restaurants: data });
      });
  };
  render() {
    return (
      <div>
        <select id="loc" onChange={this.handleChange}>
          <option id="default">default</option>
          {this.renderCity(this.state.location)}
        </select>
        <select id="rest">
          <option>default</option>
          {this.renderRestaurants(this.state.restaurants)}
        </select>
      </div>
    );
  }
  componentDidMount() {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data });
      });
  }
}

export default App;
