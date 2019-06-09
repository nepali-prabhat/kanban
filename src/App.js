import React from 'react';
import Kanban from './Components/Kanban';
class App extends React.Component {
  render(){
	return (
	  <div className="app">
		  <Kanban title={"Website"} id={0} key={0}/>
	  </div>
	);
  }
}
export default App;
