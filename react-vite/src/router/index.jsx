import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import GradeBook from '../components/GradeBook/GradeBook';
import Grades from '../components/Grades/Grades';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: 'gradebook/',
        children: [
          {
            path: "",
            element: <Navigate to="/" replace={true} />,
          },
          {
            path: ":classId",
            element: <GradeBook/>,
          },
        ]
      },
      {
        path: 'grades/',
        children: [
          {
            path: "",
            element: <Navigate to="/" replace={true} />,
          },
          {
            path: ":classId",
            element: <Grades/>,
          },
        ]
      }
      
    ],
  },
]);