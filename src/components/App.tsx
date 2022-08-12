import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css';
import Nav from './Nav';
import Find from './Find';
import ListAll from './ListAll';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const App = () => {
    return (
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={<ListAll />} />
                <Route path="/search/author" element={<Find type="Author"/>}/>
                <Route path="/search/book" element={<Find type="Book"/>}/>
                <Route path="/create" element={<CreateForm />} />
                <Route path="/update/" element={<UpdateForm />} />
                <Route path="/delete/:entity/:id" element={<DeleteForm />} />
            </Routes>
        </div>
    );
};

export default App;
