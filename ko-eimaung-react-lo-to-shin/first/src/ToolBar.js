import React from "react";

class ToolBar extends React.Component{

    styles = {
        toolbar: {
        marginBottom: 20,
        border: '1px solid red',
        },
        pink:{
            backgroundColor : 'pink'
        }
        }
    render(){
        return(
            // eslint-disable-next-line no-sequences
            <><div style={{...this.styles.toolbar,...this.styles.pink}}>{this.props.children}</div></>
        )
    }
}

export default ToolBar