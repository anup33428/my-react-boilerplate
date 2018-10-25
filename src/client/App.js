import React, { Component } from 'react';
import './app.css';


export default class App extends Component {
  state = { product: [] };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    fetch('/api/getAllProducts')
      .then(res => res.json())
      .then((product) => {
        this.setState({ product: product.recordset });
      });
  }

  render() {
    const { product } = this.state;
    return (
      <div className="container table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Location ID</th>
              <th>Shelf</th>
              <th>Bin</th>
              <th>Quantity</th>
              <th>Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {
              product.map((row, i) =>
              <tr key= {i}>
                <td>{row.ProductID}</td>
                <td>{row.LocationID}</td>
                <td>{row.Shelf}</td>
                <td>{row.Bin}</td>
                <td>{row.Quantity}</td>
                <td>{row.ModifiedDate}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}
