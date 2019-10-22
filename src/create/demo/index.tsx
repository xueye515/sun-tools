import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

interface DemoProps {
    activeTab: number;
}

interface DemoState {
    val: number;
}

class Demo extends Component<DemoProps, DemoState> {
    public constructor(props: DemoProps) {
        super(props);
        this.state = {
            val: 0
        }
    }

    public render() {
        return (<div class={styles.body}>
            content
        </div>)
    }
}

export default connect((state: any) => ({

}))(Demo);