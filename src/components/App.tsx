import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import Nav from './Nav';
import Find from './Find';
import ListAll from './ListAll';


const App = () => {
    return (
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={<ListAll />} />
                <Route path="/search/author" element={<Find type="Author"/>}/>
                <Route path="/search/book" element={<Find type="Book"/>}/>
                <Route path="/create" element={<></>} />
                <Route path="/update" element={<></>} />
                <Route path="/delete" element={<></>} />
            </Routes>
        </div>
    );
};

export default App;
