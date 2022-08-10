import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import Nav from './Nav';
import Find from './Find';
import Book from './Book';


const App = () => {
    return (
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={<p>Go somewhere else</p>} />
                <Route path="/search/author" element={<Find type="Author"/>}/>
                <Route path="/search/book" element={<Find type="Book"/>}/>
            </Routes>
        </div>
    );
};

export default App;
