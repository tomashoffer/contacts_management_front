'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Contacts from './contacts/page';
// import LoadingPage from './loading';

const HomePage = () => {
  // const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const res = await fetch('/api/courses');
  //     const data = await res.json();
  //     setCourses(data);
  //     setLoading(false);
  //   };

  //   fetchCourses();
  // }, []);

  // if (loading) {
  //   return <LoadingPage />;
  // }

  return (
    <div className="container mx-auto px-4">
      <h1>Welcome To Traversy Media</h1>
      <Contacts/>
    </div>
  );
};
export default HomePage;
