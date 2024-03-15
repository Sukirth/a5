import { Navigate, Route, Routes, useParams } from 'react-router';
import { HiMiniBars3 } from 'react-icons/hi2';
import { PiEyeglasses } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import CourseNavigation from './Navigation';
import CollapsedNav from './Navigation/CollapsedNav';
import Home from './Home';
import Modules from './Modules';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import Grades from './Grades';
import { assignments } from '../Database';
import './index.css';
import { Course } from '../../types';

function Courses({ courses }: { courses: Course[] }) {
  const { courseId } = useParams();
  const course = courses.find(course => course._id === courseId);
  let assignmentTitle = '';
  const href = decodeURIComponent(window.location.href);
  const splitHref = href.split('/');

  if (splitHref.at(-2) === 'Assignments') {
    const assignmentId = splitHref.at(-1);
    const assignment = assignments.find(
      assignment => assignment._id === assignmentId
    );
    assignmentTitle = assignment?.title ?? '';
  }

  const breadcrumbText =
    splitHref.at(-1) === 'Home'
      ? ['Modules']
      : splitHref.at(-2) === 'Assignments'
      ? [splitHref.at(-2), assignmentTitle]
      : [splitHref.at(-1)];

  return (
    <>
      <div className="d-none d-md-block mx-3 p-2">
        <div className="d-flex align-items-center custom-breadcrumb border-bottom border-2">
          <HiMiniBars3
            color="#DC4C64"
            cursor="pointer"
            fontSize="1.7em"
            className="me-3"
          />
          <ol
            className="breadcrumb align-self-center pt-3"
            style={{ fontSize: 20 }}
          >
            <li className="breadcrumb-item">
              <Link to="#" className="link-danger">
                {course?.name}
              </Link>
            </li>
            {breadcrumbText.map(text => (
              <li key={text} className="breadcrumb-item">
                {text}
              </li>
            ))}
          </ol>
          <button className="btn btn-light ms-auto d-flex justify-content-center align-items-center">
            <PiEyeglasses fontSize="1.2em" className="me-1" />
            Student View
          </button>
        </div>
      </div>
      <CollapsedNav />
      <CourseNavigation />
      <div>
        <div className="window-container">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
            <Route
              path="*"
              element={breadcrumbText.map(text => {
                return (
                  <h1 className="mt-5" key={text}>
                    {text}
                  </h1>
                );
              })}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Courses;
