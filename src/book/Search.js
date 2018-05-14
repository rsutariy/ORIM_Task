import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axiosInstance from "../utils/AxiosInstance";
import Pagination from "react-js-pagination";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import $ from 'jquery';
import { push } from 'react-router-redux';
window.React = React;


//Pop Up Modal
class MyModal extends Component {
    render() {

        const { text, onRequestClose } = this.props;
        return (
            <Modal onRequestClose={onRequestClose} effect={Effect.ScaleUp}>

                <p>ISBN No : {text}</p>
                <button onClick={ModalManager.close}>Close</button>
            </Modal>

        );
    }
}



export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            booklist: [],
            search: ''
        };

    }

    async getListofbooks() {
        try {
            this.setState({ loading: true });
            let url = `books-test-collection.json`;
            const response = await axiosInstance.get(url);
            const resultdata = response.data;
            const search = this.props.match.params.search;
            const searchString = search.replace(/%20/g, " ");
            var updateddata = resultdata.filter(function (el, index) {
                return resultdata[index]['title'] === searchString;
            });

            this.setState({ loading: false, booklist: updateddata });
        } catch (e) {
            this.setState({ loading: false });
        }
    }

    async 

    async componentWillMount() {
        await this.getListofbooks();
    }

    //Pop Up Modal
    openModal(text) {
        ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
    }

    render() {

        let body = null;
        if (this.state.loading) {
            body = <div className="row">Loading...</div>;
        } else if (this.state.booklist) {  
            var data= this.state.booklist;
           console.log(data[0].title);
                return(<div className=" card">

                <div className="card-block">
                    <h4> <u className="card-title">{data[0].title}</u></h4>
                    Price : {data[0].price}$
                                                   <br />
                    Publisher : {data[0].publisher}
                    <br />
                    Amazon rank: {data[0].amazon_rank}
                    <br /><br />
                    <a
                        className="btn btn-primary"
                        onClick={() => this.openModal(data[0].primary_isbn)}>
                        See ISBN
                                </a>
                </div>
            </div>
) 
        }

        return (
            <div>
                {body}
            </div>
        );
    }
}
export default Search;