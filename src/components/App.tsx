import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import Nav from './Nav';
import Author from './Author';
import Book from './Book';


const App = () => {
    return (
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={
                    <Author authorID="author-1" />
                }/>
                <Route path="/book" element={<Book />}/>
            </Routes>
        </div>
    );
};

export default App;
