import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [Next, shownext] = useState();
  const [click, setclick] = useState(false);
  const [Check, setcheck] = useState(false);
  const [cash, setcash] = useState(0);
  const [bill, setbill] = useState(0);
  // var bill=0;
  const [change, getchange] = useState(0);
  const [item, setitem] = useState(2);
  const [showtable, setshowtable] = useState(false);
  const [validcashbill, setvalidity] = useState(true);
  const message = [
    "Amount entered is less than Bill amount",
    "No amount to be returned as Bill and Cash amounts are equal",
    ""
  ];
  const note = [2000, 500, 100, 20, 10, 5, 1];
  const [list, setlist] = useState([]);

  function Enteredbill(event) {
    setbill(event.target.value);
    // if (bill <= 0) shownext(false);
  }

  function CheckndNext() {
    setclick(true);
    if (bill > 0) shownext(true);
    else shownext(false);
  }

  function enteredCash(event) {
    setcash(event.target.value);
    // setcheck(false);
  }

  function CheckAmount() {
    setcheck(true);
    setshowtable(false);
    if (cash <= 0 || bill <= 0) setvalidity(false);
    else {
      setvalidity(true);
      var lolo = cash - bill;
      if (lolo < 0) setitem(0);
      else if (cash === bill) setitem(1);
      else {
        setitem(2);
        setshowtable(true);
        createtable();
      }
    }
  }
  function createtable() {
    var diff = cash - bill;
    getchange(diff);
    setlist(
      note.map((item) => {
        var residue = (diff / item) | 0;
        diff = diff - item * residue;
        return residue;
      })
    );
  }
  return (
    <div className="App">
      <h1 className="heading">Cash Change Manager</h1>
      <h2>
        Welcome 🤗 Enter Bill of the customer and Cash paid by the Customer to
        find the change and minimum number of notes to return.
      </h2>
      <h1>
        Enter Bill:
        <br />
        <input type="number" onChange={Enteredbill} />
      </h1>
      <br />
      {click && Next ? null : <button onClick={CheckndNext}>next</button>}
      {Next ? (
        <div>
          <h1>
            Enter Cash:
            <br />
            <input type="number" onChange={enteredCash} />
          </h1>
          <h1>
            <button onClick={CheckAmount}>Check</button>
          </h1>
          {Check ? (
            <div>
              {validcashbill ? (
                <h1> {message[item]}</h1>
              ) : (
                <h1>Enter valid cash and bill amount</h1>
              )}
            </div>
          ) : null}
        </div>
      ) : click ? (
        <h1>enter valid bill</h1>
      ) : null}
      {showtable ? (
        <div>
          <h1>Return Change:{change}</h1>
          <table>
            <tr>
              <th>No.of Notes</th>
              <th>Note</th>
            </tr>

            {Object.keys(list).map((item) => {
              if (list[item])
                return (
                  <tr>
                    <td className="bored">{list[item]}</td>
                    <td className="bored">{note[item]}</td>
                  </tr>
                );
              else
                return (
                  <tr>
                    <td className="bored">
                      <div
                        // className="rotate"
                        style={{ visibility: "hidden" }}
                      >
                        {list[item]}
                      </div>
                    </td>

                    <td className="bored">{note[item]}</td>
                  </tr>
                );
            })}

            {/* {note.map((item) => {
                  return <td><div className="bored">{item}</div>;</td>
                })} */}
          </table>
        </div>
      ) : null}
    </div>
  );
}
