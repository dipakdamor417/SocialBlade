import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import EditProfile from '../EditProfile';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit" element={<EditProfile  />} />
    </Routes>
  );
}

export default HomeRoutes;
