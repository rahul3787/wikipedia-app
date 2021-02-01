import axios from "axios";
import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./display.css";
let rowsData = [];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Display = () => {
  const classes = useStyles();

  const [display, setDisplay] = useState({
    allData: [],
  });

  useEffect(() => {
    getBlogPost();
  }, []);

  let getBlogPost = () => {
    axios
      .get("https://infinite-waters-01505.herokuapp.com/api")
      .then((response) => {
        const data = response.data;

        setDisplay({ allData: data });
      })
      .catch(() => {});
  };
  

  display.allData.map((data, index) => {
    rowsData.push({
      id: index,
      title: data.title,
      body: data.body,
    });
  });

  const tableHeader = ["ID", "TITLE", "LINK"];

  const TableHeaderData = () => {
    return tableHeader.map((data, index) => <th>{data}</th>);
  };

  

  
  const [history, setHistory] = useState("");

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>History</h1>
      </div>

      <Grid container justify="center">
        <Grid item xs={12}>
          <center>
            <div>
              <table id="tableFileData">
                <tr>{TableHeaderData()}</tr>

                <tbody>
                  {display.allData.map((data, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{data.title}</td>
                      
                      <td>
                        <a
                          className="ui button"
                          href={data.body}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {data.body}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </center>
        </Grid>
      </Grid>
    </div>
  );
};

export default Display;
