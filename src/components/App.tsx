import React from 'react';
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={'hi'}/>
            </Routes>
        </div>
    );
};

export default App;
