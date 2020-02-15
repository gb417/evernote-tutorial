import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import styles from './styles';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null,
        };
    }

    newNoteBtnClick = () => {
        this.setState({
            title: null,
            addingNote: !this.state.addingNote,
        });
    };

    updateTitle = (txt) => {
        this.setState({
            title: txt
        });
    };

    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({
            title: null,
            addingNote: false,
        });
    };

    selectNote = (n,i) => {
        this.props.selectNote(n,i);
    };

    deleteNote = (n) => {
        this.props.deleteNote(n);
    };

    render() {
        if (this.props.notes) {
            return (
                <div className={this.props.classes.sidebarContainer}>
                    <Button
                        onClick={this.newNoteBtnClick}
                        className={this.props.classes.newNoteBtn}
                    >
                        {this.state.addingNote ? 'Cancel' : 'New Note'}
                    </Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input
                                    type="text"
                                    className={this.props.classes.newNoteInput}
                                    placeholder="Enter note title"
                                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                                />
                                <Button
                                    className={this.props.classes.newNoteSubmitBtn}
                                    onClick={this.newNote}
                                >
                                    Submit Note
                                </Button>
                            </div>
                            :
                            null
                    }
                    <List>
                        {
                            this.props.notes.map((_note, _index) => {
                                return (
                                    <div key={_index}>
                                        <SidebarItemComponent
                                            _note={_note}
                                            _index={_index}
                                            selectedNoteIndex={this.props.selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote}
                                        />
                                        <Divider/>
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            );
        }else{
            return(<div>Add a note!</div>);
        }
    }
}

export default withStyles(styles)(SidebarComponent);
