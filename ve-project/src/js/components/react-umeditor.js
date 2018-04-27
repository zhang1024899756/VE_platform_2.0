import React from 'react';
import Editor from 'react-umeditor';

export default class ReactUmeditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            content: ""
        }
    }
    handleChange (content) {
        this.setState({content: content})
        this.props.handleChildValueChange(content)
    }

    getIcons () {
        const icons = [
            "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
            "paragraph fontfamily fontsize | superscript subscript | ",
            "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
            "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
            "horizontal date time  | image emotion spechars | inserttable"
        ]
        return icons;
    }
    getPlugins () {
        return {
            "image": {
                "uploader": {
                    "name":"file",
                    "type":"local",
                    "url": "http://localhost:8100/picture/upload"
                }
            }
        }
    }
    render () {
        const icons = this.getIcons();
        const plugins = this.getPlugins();
        return(
          <div>
          <Editor ref="editor"
            icons={icons}
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
            plugins={plugins}
          />
          </div>
        );
    }
}
