import React, { Component } from 'react';

import HelloService from '../Services/HelloService'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    width: '40%',
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  mainContent: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: 150,
    float: 'right'
  },
  leftPane: {
    height: 140,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 1,
    textAlign: 'center'
  },
  rightPane: {
    height: 140,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 1,
    textAlign: 'center'
  },
  incidentHeader: {
    width: '100%',
    padding: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  incidentTable: {
    height: 275,
    width: '100%',
    padding: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
});

class Incident extends Component {
  state = {
    greetings: ['404 Greetings Not Found!'],
    greeting: '',
    spacing: '16'
  };

  componentDidMount() {
    this.getAllGreetings();
  }

  handleChange(string) {

  }


  getAllGreetings() {
    HelloService.getGreeting()
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          greetings: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateIncident() {
    HelloService.postGreeting(this.state.greeting).then((response) => response.json())
      .then((responseJson) => {
        this.getAllGreetings()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  resolveIncident() {
    HelloService.deleteGreetings().then((responseJson) => {
      this.getAllGreetings()
    })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div className="Incident">
        <Grid container spacing={16} className={classes.mainContent}>
          <Grid item xs={12} sm={12} spacing={16} margin="normal">
            <Paper margin="normal" className={classes.incidentHeader}>
              <h3>Incident ID: {this.props.match.params.id}</h3>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
              <Grid item sm={4} margin="normal">
                <Paper className={classes.leftPane}>
                  <h3>Contact Info</h3>
                </Paper>
              </Grid>
              <Grid item xs={4} margin="normal">
                <Paper className={classes.incidentTable}>
                  <TextField
                    id="multiline-flexible"
                    label="Incident Notes"
                    multiline
                    rowsMax="4"
                    rows="4"
                    cols="20"
                    value={this.state.incidentNotes}
                    onChange={this.handleChange('multiline')}
                    className={classes.textField}
                    margin="normal"
                    autoFocus="true"
                  />
                  <br />
                  <br />
                  <br />
                  <Button disabled variant="raised" color="secondary" className={classes.button} onClick={this.updateIncident.bind(this)}>
                    Submit &amp; Exit
              </Button>
                  <br />
                  <br />
                  <br />
                  <Button variant="raised" color="primary" className={classes.button} onClick={this.resolveIncident.bind(this)}>
                    Resolve
              </Button>
                </Paper>
              </Grid>
              <Grid item sm={4} margin="normal">
                <Paper className={classes.rightPane}>
                  <h3>Incident History</h3>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}
export default withStyles(styles)(Incident);