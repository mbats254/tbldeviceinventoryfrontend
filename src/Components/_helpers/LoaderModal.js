import React, { Component } from 'react';
import Headers from '../Layouts/Headers'
import { config } from '../_helpers/global'
import axios from 'axios';
import $ from 'jquery';
import Loader from '../Layouts/Loader';
import logo from '../../assets/Images/HargeisaLogo.png';
import { EventEmitter } from './EventEmitter';

export class LoaderModal extends Component {

    constructor(props) {

        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
            loading: false
        }
        EventEmitter.subscribe('loaded', (event) => this.pageLoaded(event));
    }

    componentDidMount() {
        const { loading } = this.props;
    }

    pageLoaded(event) {
        console.log('loaddded')
        this.state.loading = false;
    }

    pageStartLoading(event) {
        this.state.loading = false;
    }

    handleChange(event) {
    }

    onTableChange(event) {
    }

    render() {
        const fixedModal = { width: '100vw', height: '100vh', zIndex: '2001', background: 'white', position: 'fixed', top: '0', alignItems: 'center', display: 'none', justifyContent: 'center' }
        const logoDimensions = { height: '100px', innerWidth: "180px" }

        // {""1st":{"date""12/12/2022", "result":"good"}, "2nd":{"date":12/12/2022"","result":"good"}}

        const { loading } = this.props;
        return (
            <div>

                {loading ? <div id="LoadingModal" style={fixedModal}> <div className=""><div className="row"><img src={logo} style={logoDimensions} /></div><div className=""><div className="text-center"><Loader></Loader></div></div></div></div> : <div></div>}


            </div>
        )
    }
}

LoaderModal.defaultProps = {
    loading: false
}

export default LoaderModal;
