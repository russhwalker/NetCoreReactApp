import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Cars } from './components/Cars';
import { CarEdit } from './components/CarEdit';
import { ModelEdit } from './components/ModelEdit';
import { Models } from './components/Models';
import { Makes } from './components/Makes';
import { MakeEdit } from './components/MakeEdit';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/cars' component={Cars} />
                <Route path='/caredit/:carId' component={CarEdit} />
                <Route path='/makes' component={Makes} />
                <Route path='/makeedit/:makeId' component={MakeEdit} />
                <Route path='/models' component={Models} />
                <Route path='/modeledit/:modelId' component={ModelEdit} />
            </Layout>
        );
    }
}