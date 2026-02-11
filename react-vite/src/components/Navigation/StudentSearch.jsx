import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { fetchSearchStudents } from "../../redux/student";
import "./Navigation.css";

function StudentSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchDelayRef = useRef(null);
  const searchRef = useRef();
  const resultsRef = useRef();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    // Clear existing timeout
    if (searchDelayRef.current) {
      clearTimeout(searchDelayRef.current);
    }

    if (value.trim()) {
      // Set new timeout for debounced search
      searchDelayRef.current = setTimeout(() => {
        dispatch(fetchSearchStudents({ search: value }))
          .then(() => {
            setShowResults(true);
          });
      }, 300);
    } else {
      setShowResults(false);
    }
  };

  const handleStudentClick = (studentId) => {
    navigate(`/students/${studentId}`);
    setSearch('');
    setShowResults(false);
  };

  const handleFocus = () => {
    if (search.trim() && students && students.length > 0) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (searchDelayRef.current) {
        clearTimeout(searchDelayRef.current);
      }
    };
  }, []);

  return (
    <div id="navSearchCon" ref={searchRef}>
      <div id="navSearchInputCon">
        <IoSearch id="navSearchIcon" />
        <input
          type="text"
          id="navSearchInput"
          placeholder="Search students..."
          value={search}
          onChange={handleSearch}
          onFocus={handleFocus}
        />
      </div>
      {showResults && students && students.length > 0 && (
        <div id="navSearchResults" className="whiteBox" ref={resultsRef}>
          {students.slice(0, 10).map((student) => (
            <div
              key={student.id}
              className="navSearchResultItem"
              onClick={() => handleStudentClick(student.id)}
            >
              <div className="navSearchResultName">
                {student.first_name} {student.last_name}
              </div>
              <div className="navSearchResultGrade">Grade {student.grade}</div>
            </div>
          ))}
          {students.length > 10 && (
            <div className="navSearchResultMore">
              {students.length - 10} more results...
            </div>
          )}
        </div>
      )}
      {showResults && search.trim() && students && students.length === 0 && (
        <div id="navSearchResults" className="whiteBox" ref={resultsRef}>
          <div className="navSearchResultItem">No students found</div>
        </div>
      )}
    </div>
  );
}

export default StudentSearch;
