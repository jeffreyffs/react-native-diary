// @flow

import React, {Component} from 'react';
import {
    View,
    UIManager,
    findNodeHandle,
} from 'react-native';

class SharedView extends Component {
    _view: any;
    static contextTypes = {
        registerSharedView: React.PropTypes.func,
        unregisterSharedView: React.PropTypes.func,
    };
    render() {
        return (
            <View
                ref={c => this._view = c}>
                {this.props.children}
            </View>
        )
    }
    componentDidMount() {
        const { registerSharedView } = this.context;
        if (!registerSharedView) return;

        const { name, containerRouteName } = this.props;
        const nativeHandle = findNodeHandle(this._view);
        registerSharedView({
            name,
            containerRouteName,
            nativeHandle,
            reactElement: this.render(),
        });
    }

    componentWillUnmount() {
        const { unregisterSharedView } = this.context;
        if (!unregisterSharedView) return;
        
        const { name, containerRouteName } = this.props;
        unregisterSharedView(name, containerRouteName);
    }
}

export default SharedView;