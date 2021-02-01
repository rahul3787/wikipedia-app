import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {logOut} from '../action/auth'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

let historyData =[];

const Search = ({logOut}) => {
  const [term, setTerm] = useState("React");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  const handelText = (event) => {
    setTerm(event.target.value);
  };
  const handelSubmit = (event) => {
    event.preventDefault();
  };

  // de-bouncing the search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };

    // do not search if no term
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  const searchResultsMapped = results.map((result) => {
    // const [history , setHistory] =useState('');
    const handelHistory =(event)=>{
      let temp =`https://en.wikipedia.org?curid=${result.pageid}`
      let tempTitle =`${result.title}`
      historyData.push({
        title : temp,
        body : tempTitle

      })

      axios.post( "https://infinite-waters-01505.herokuapp.com/single",{title:tempTitle,body:temp})
.then((res)=>{
          console.log(res.statusText)
          console.log("asdgv",historyData)
          
        //  setState(defaultState)
        //  setMyFile('')
         
         console.log('the data has sent to the server')

})
.catch((err)=>{
  console.log(err)
})
 
      console.log(historyData)

    }
    return (
      <div className="item" key={result.pageid}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={8}>
            <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
              <div className="right floated content">
                <a
                  className="ui button"
                  href={`https://en.wikipedia.org?curid=${result.pageid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handelHistory}
                >
                  {result.title}
                </a>
              </div>
              <div className="content">
                <span
                  dangerouslySetInnerHTML={{ __html: result.snippet }}
                ></span>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          
          <Grid item xs={6}>
            <div className="field">
              <h2>Wikipedia search </h2>
              <button onClick={() => logOut()}>
                   <Link to='/'>logOut</Link>
                 </button>
                 
                 <button style={{marginLeft:"20px"}} >
                   <Link to='/History'>History</Link>
                 </button>
              <form onSubmit={handelSubmit}>
                <input
                  className="input"
                  value={term}
                  onChange={handelText}
                  style={{ margin: "10px", height: "25px", width: "300px" }}
                />
                <input
                  type="submit"
                  placeholder="Search"
                  style={{ margin: "10px", height: "25px" }}
                />
              </form>
            </div>
          </Grid>
          <Grid item xs={2}>
              
              </Grid>  
        </Grid>
      </div>
      <div className="ui celled list">{searchResultsMapped}</div>
    </div>
  );
};


const mapStateToProps = state =>({
  islogedIn: state.islogedIn
})
export default connect(mapStateToProps, { logOut })(Search);