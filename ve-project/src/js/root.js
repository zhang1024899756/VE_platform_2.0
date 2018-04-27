//var React=require("react");
//var ReactDom=require("react-dom");
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch  } from 'react-router-dom'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import PlaIndex from './components/pla-index';
import PlaLogin from './components/user-login';
import NewExperiment from './components/new-experiment';
import NewComponent from './components/new-component';
import NewAttribute from './components/new-attribute';
import ExperDetails from './components/exper-details';
import WorkStation from './components/work-station';


export default class Root extends React.Component{
	render () {
		return (
			<div>
				<BrowserRouter>
						<Switch>
							<Route path="/login" component={PlaLogin}></Route>
							<Route path="/index" component={PlaIndex}></Route>
							<Route path="/experdetails/:id" component={ExperDetails}></Route>
							<Route path="/experimentnew" component={NewExperiment}></Route>
							<Route path="/componentnew" component={NewComponent}></Route>
							<Route path="/attributenew" component={NewAttribute}></Route>
							<Route path="/workstation" component={WorkStation}></Route>
						</Switch>
				</BrowserRouter>
			</div>
		)
	}
}
ReactDom.render(<Root/>,document.getElementById('container'))
