import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MusicToken from "./contracts/MusicToken.json";
import CheckMetamask from "./Components/CheckMetamask.js";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MusicToken.networks[networkId];
      const instance = new web3.eth.Contract(
        MusicToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;


  };
  render() {
    if (!this.state.web3) {
      return <div><CheckMetamask></CheckMetamask></div>;
    }
    return (
      <div className="App">
        <h1>Ethereum music</h1>
        <h3>Account address</h3>
        <h4>{this.state.accounts}</h4>
        <p>Your Music</p>
        <div>{this.state.storageValue}</div>
        <div>
        <h3>Add your latest song!</h3>
        <input id="xvalue" type="text"></input> 
        <input id="Button1" type="button" onclick="" value="Add to Blockchain"></input>
        </div>
      </div>
    );
  }
}

export default App;
