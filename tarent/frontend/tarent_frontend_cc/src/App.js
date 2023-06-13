import './App.css';
import CreateCourseWidget from './createCourse.tsx';

function App() {
   return (
    <div className="App">
      <header className="App-header">
        <div>
          Herzlich Wellkommen zu dem Tarent Coding Challenge App von Christopher Rehm
        </div>
       <CreateCourseWidget />
       <br/>
      </header>
    </div>
  );
}

export default App;
