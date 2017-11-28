/* This application is a simple react application based on Grocery list where a person can see the price by selecting the product
** and choosing their quantities. The total bill is shown in the end.
**importing react and react dom from the library installed.
** Also, using webpack with babel as loader for converting JSX element to browser readable format
*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// Creating component by extending the React Componet
class GroceryList extends React.Component {
  // Constructor for initializing the prop and state.
  // We are taking a list where we are storing their id , productname, its price/lb and the the total which will be updating on the fly.
  constructor(props,context) {
      super(props,context);
      this.state = {
      bill : 0,
      list1 : [{id:1, product:'Tomato', price: 3,total: 0}, {id:2, product:'Onion', price: 2,total: 0}, {id:3, product:'Mushroom', price:3,total: 0}, {id:4, product:'Potato', price:2.5,total: 0}]
      }
    }

    // a method for calculating the Total bill for all the products a peson select.
    // Also, setting the state bill so that render will call and update it in GUI
  calculatePrice(message,e) {
    let price = message.price;
    message.total = price*e.target.value;
    var tempBill = 0;

    for (var i=0; i < this.state.list1.length; i++) {
      tempBill = tempBill+ this.state.list1[i].total;
    }

    this.setState({bill:tempBill});
  }

// Actual render method in which first we generate a variable which iterate the list though we are showing he product.
// Also, display the scroll bar to see the quantity which is common for all products.
// Displaying the price and the total for that product
  render() {

    const msgs = this.state.list1.map((message,i) => {
      return (
        <tr key = {i}>
          <td> {message.product}</td>
          <td key = {message.id}><select name="quantity" onChange = {this.calculatePrice.bind(this,message)}>
              <option value="0"></option>
              <option value="1">1lb</option>
              <option value="2">2lb</option>
              <option value="5">5lb</option>
              <option value="10">10lb</option>
            </select>
          </td>
          <td>{message.price}</td>
          <td id = "total">{message.total}</td>
        </tr>
      )
    });

    return (
      <div className ="col-sm-6" >
          <table className ="table table-bordered table-striped table-condensed table-hover">
              <caption className = "text-center"><h2><b>GroceryList</b></h2> </caption>
              <thead><tr>
              <th> <b>Product</b></th>
              <th> <b>Quantity </b></th>
              <th> <b>Price/lb </b></th>
              <th> <b>Total </b></th>
              </tr></thead>
              <tbody>
                {msgs}

              </tbody>
            </table>

              <div className = "col-sm-8"></div>
              <label className = "col-sm-2"><b>Bill($)</b></label>
              <span id ="bill" className = "col-sm-2">{this.state.bill}</span>

      </div>
    )
  }

}

// Main method for embedding the virtual dom to real dom.
// Real dom is at HTML file(index.html)
ReactDOM.render(<GroceryList />, document.getElementById('app'));
