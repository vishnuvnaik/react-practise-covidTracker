import React, { Component } from "react";
import Axios from "axios";
import { Accordion, Card, Button } from "react-bootstrap";
class Statedata extends Component {
  constructor() {
    super();
    this.state = {
      StateData: {},
    };
  }
  componentDidMount() {
    Axios.get("https://api.covid19india.org/state_district_wise.json").then(
      (response) => {
        this.setState({ StateData: response.data });
      }
    );
  }
  render() {
    let keys = Object.keys(this.state.StateData);
    return (
      <div className="row">
        <div className="col-md-12">
          <Accordion>
            {keys.map((itm, ky) => {
              let districts = this.state.StateData[itm].districtData;
              let total_active = 0;
              let total_confirmed = 0;
              let total_deaths = 0;
              let total_recovery = 0;
              let district_list = [];
              for (let x in districts) {
                total_active += districts[x].active;
                total_confirmed += districts[x].confirmed;
                total_deaths += districts[x].deceased;
                total_recovery += districts[x].recovered;
                let ob = districts[x];
                ob["district_name"] = x;
                district_list.push(ob);
              }
              return (
                <Card>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant="primary"
                      eventKey={ky}
                    >
                      {itm} -
                      <span className="btn-dark p-1 mr-2">
                        totalcases {total_confirmed}
                      </span>
                      Active {total_active}
                      Confirmed {total_confirmed} deaths {total_deaths}
                      recovered {total_recovery}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={ky}>
                    <Card.Body>
                      <table className="table table_bordered table">
                        <thead>
                          <tr>
                            <td>District</td>
                            <td>Confirmed</td>
                            <td>Active</td>
                            <td>Recovered</td>
                            <td>Deaths</td>
                          </tr>
                        </thead>
                        <tbody>
                          {district_list.map((itm, key) => {
                            return (
                              <tr>
                                <td>{itm.district_name}</td>
                                <td>{itm.confirmed}</td>
                                <td>{itm.active}</td>
                                <td>{itm.recovered}</td>
                                <td>{itm.deceased}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}
export default Statedata;
