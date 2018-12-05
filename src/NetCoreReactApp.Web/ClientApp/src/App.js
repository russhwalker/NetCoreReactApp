import React, { Component } from 'react';
import { Cars } from './components/Cars';
import { CarEdit } from './components/CarEdit';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { MakeEdit } from './components/MakeEdit';
import { Makes } from './components/Makes';
import { ModelEdit } from './components/ModelEdit';
import { Models } from './components/Models';
import { Route } from 'react-router';

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