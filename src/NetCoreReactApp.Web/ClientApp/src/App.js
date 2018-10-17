import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Cars } from './components/Cars';
import { CarEdit } from './components/CarEdit';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/cars' component={Cars} />
                <Route path='/caredit/:carId' component={CarEdit} />
            </Layout>
        );
    }
}