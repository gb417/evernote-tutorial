import React from 'react';
import ReactQuill from 'react-quill';
import {withStyles} from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import styles from './styles';
import debounce from '../helpers';

class EditorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            text: '',
        };
    }

    componentDidMount=()=>{
        this.setState({
            text: this.props.selectedNote.text,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id,
        });
    };

    componentDidUpdate=()=>{
        if (this.props.selectedNote.id !== this.state.id) {
            this.setState({
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id,
            });
        }
    };

    updateBody = async (val) => {
        await this.setState({
            text: val,
        });
        this.update();
    };

    updateTitle = async (val) => {
        await this.setState({
            text: val,
        });
        this.update();
    };


    update = debounce(() => {
        this.props.noteUpdate(this.state.id, {
            title: this.state.title,
            body: this.state.text,
        })
    }, 1500);

    render() {
        return (
            <div className={this.props.classes.editorContainer}>
                <BorderColorIcon className={this.props.classes.editIcon} />
                <input
                    className={this.props.classes.titleInput}
                    placeholder='Note title...'
                    value={this.state.title?this.state.title:''}
                    onChange={(e)=>this.updateTitle(e.target.value)}
                />
                <ReactQuill
                    value={this.state.text===undefined?'':this.state.text}
                    onChange={this.updateBody}
                />
            </div>
        );
    }
}

export default withStyles(styles)(EditorComponent);
