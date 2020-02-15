import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles';
import {removeHTMLTags} from '../helpers';

class SidebarItemComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    selectNote = (n, i) => {
        this.props.selectNote(n, i);
    };

    deleteNote = (note) => {
        if (window.confirm('Are you sure you want to delete:' + note.title + '?')) {
            this.props.deleteNote();
        }
    };

    render() {
        return (
            <div key={this.props._index}>
                <ListItem
                    className={this.props.classes.listItem}
                    selected={this.props.selectedNoteIndex === this.props._index}
                    alignItems='flex-start'>
                    <div
                        className={this.props.classes.textSection}
                        onClick={() => this.selectNote(this.props._note, this.props._index)}
                    >
                        <ListItemText
                            primary={this.props._note.title}
                            secondary={removeHTMLTags(this.props._note.body.substring(0, 30) + '...')}
                        />
                        <DeleteIcon
                            onClick={() => this.deleteNote(this.props._note)}
                            className={this.props.classes.deleteIcon}
                        />
                    </div>
                </ListItem>
            </div>
        );
    }
}

export default withStyles(styles)(SidebarItemComponent);
