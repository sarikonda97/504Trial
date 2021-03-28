import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import RESTCaller from './../../helper'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CssBaseline from '@material-ui/core/CssBaseline';
import ToggleButton from '@material-ui/core/Switch';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { Route, Switch, Link, NavLink, Redirect } from "react-router-dom";

const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [toggle, setToggle] = useState(true);

  const handleInputChange = async (searchQuery) => {
    // eslint-disable-next-line no-console
    console.log('searchQuery');
    
    const searchUrl = ` https://bazinganews.herokuapp.com/searchresults/?search=${searchQuery}`;
    const headers = { };

    const data = await RESTCaller(searchUrl, headers);

    console.log(data)
};
const sideBarClickHandler = async (genre) => {
  console.log("side bar clicked" + genre);

  const searchUrl = ` https://bazinganews.herokuapp.com/searchresults/?search=${genre}`;
    const headers = { };

    const data = await RESTCaller(searchUrl, headers);
    console.log(data)
}

    return (
        <div>
        <div className="headingWrapper">
          <h1 className="heading">AI Gazette</h1>
          <SearchBar className="search-bar"
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
            onRequestSearch={() => handleInputChange(searchQuery)}
          />
        </div>
           <Drawer
          className={"drawer"}
          variant="permanent"
          classes={{
            paper: "drawerPaper",
          }}
          anchor="left"
        >
          {/* <div className={toolbar} /> */}
          <List className="search-here">
            
              <ListItem button key={"Search Here"}>
                <ListItemText primary={"Search Here"} />
              </ListItem>
              <ToggleButton
          checked={toggle}
          onChange={() => {console.log("clicked search here"); toggle === true ? setToggle(false) : setToggle(true);}}
          color="primary"
          name="checkedB"
          // inputProps={{ 'aria-label': 'primary checkbox' }}
        />
               <Divider />
          </List>
          <List>
            {['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'].map((text, index) => (
              <>
              <ListItem button key={text} className="side-bar-elements">
                {/* <ListItemText primary={text} onClick={() => {sideBarClickHandler(text);}}/> */}
                <NavLink activeClassName="active" to={{
                  pathname: '/results',
                  searchKey: {
                    searchPhrase: {text}
                  }
                }}>
                  {text}
                </NavLink>
              </ListItem>
               <Divider />
               </>
            ))}
          </List>
        </Drawer>
        <div className="trending-news">
          <h2>Trending News </h2>
          <span></span>
          <p className="curly-brace">{"{"}</p>
          <span className="dot-blue"></span>
          <span className="dot-text">Hero</span>
          <span className="dot-red"></span>
          <span className="dot-text">Villain</span>
          <span className="dot"></span>
          <span className="dot-text">Victim</span>
          <p className="curly-brace">{"}"}</p>
        </div>
        <div className="link-container">
          {/* <NavLink activeClassName="active" to="/results">
            Results
          </NavLink> */}
        </div>
      </div>
    )
}

export default Home;