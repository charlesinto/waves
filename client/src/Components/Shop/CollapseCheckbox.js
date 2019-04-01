import React, { Component } from 'react';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';
import { List, ListItem, ListItemSecondaryAction
    , ListItemText, Checkbox, Collapse
} from "@material-ui/core";


class CollapseCheckbox extends Component {
    state = {
        open: false,
        checked:[]
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
    handleOnCheckChange(id){
        const { checked } = this.state;
        const indexOfId = checked.indexOf(id);
        if(indexOfId === -1){
            checked.push(id);
            this.setState({
                checked: [...checked]
            },() => this.props.handleCheck(this.state.checked))
        }else{
            checked.splice(indexOfId, 1)
            this.setState({
                checked: [...checked]
            }, () => this.props.handleCheck(this.state.checked))
        }
    }
    renderList(){
       return this.props.list ?
            this.props.list.map((list, i) => (
                
                <ListItem key={i} style={{padding:'10px 0'}}>
                    <ListItemText 
                        primary={list.name}
                    />
                    <ListItemSecondaryAction>
                        <Checkbox 
                            color="primary"
                            onChange={() => this.handleOnCheckChange(list._id)}
                            checked= {this.state.checked.indexOf(list._id) !== -1}
                        />

                    </ListItemSecondaryAction>
                </ListItem>
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
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse> 
                </List>
            </div>
        );
    }
}

export default CollapseCheckbox;