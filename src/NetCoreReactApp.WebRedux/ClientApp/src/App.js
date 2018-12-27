import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { Cars } from './components/Cars';
import { CarEdit } from './components/CarEdit';
import { MakeEdit } from './components/MakeEdit';
import { Makes } from './components/Makes';
import { ModelEdit } from './components/ModelEdit';
import { Models } from './components/Models';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/cars' component={Cars} />
        <Route path='/caredit/:carId' component={CarEdit} />
        <Route path='/makes' component={Makes} />
        <Route path='/makeedit/:makeId' component={MakeEdit} />
        <Route path='/models' component={Models} />
        <Route path='/modeledit/:modelId' component={ModelEdit} />
    </Layout>
);