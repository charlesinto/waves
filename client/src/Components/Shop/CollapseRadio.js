import React, { Component } from 'react';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';
import { List, ListItem
    , ListItemText, Radio,RadioGroup, FormControlLabel, Collapse
} from "@material-ui/core";

class CollapseRadio extends Component {
    state = {
        open: false,
        value: '0'
    }
    componentDidMount(){
        return this.props.init ? this.setState({open: this.props.init}) : null
    }
    handleClick(){
        this.setState({open : !this.state.open})
    }
    renderAngle(){
        return this.state.open ? 
                                    <FontAwesomeIcon
                                        icon={faAngleUp}
                                        className="icon"
                                    />
                                
                        : 
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className="icon"
                                />
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        }, () => this.props.handleCheck(this.state.value))
       
    }
    renderList(){
        return this.props.list ?
            this.props.list.map(element => (
                <FormControlLabel 
                    key={element._id}
                    value={`${element._id}`}
                    control={<Radio />}
                    label={element.name}
                />

                
            ))
        : null
    }
    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom:'1px solid #bdbdbd'}}>
                    <ListItem
                        onClick={() => this.handleClick()}
                        style={{padding:'10px 23px 10px 0'}}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.renderAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <RadioGroup
                            arial-label="prices"
                            name="prices"
                            value={this.state.value}
                            onChange={(event) => this.handleChange(event)}
                        >
                            {this.renderList()}
                        </RadioGroup>
                    </Collapse> 
                </List>
            </div>
        );
    }
}

export default CollapseRadio;