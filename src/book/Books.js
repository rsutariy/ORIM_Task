import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axiosInstance from "../utils/AxiosInstance";
import Pagination from "react-js-pagination";
import { browserHistory } from 'react-router';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
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



export class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            booklist: [],
            booksResultList: [],
            loadBooksList: [],
            next: "",
            prev: "",
            totalBooks: "",
            currentpage: 1,
            search: '',
            page: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    //function to get list of books
    async getBookList(page) {
        try {

            this.setState({ loading: true });
            const offset = page * 10;

            let url = `books-test-collection.json`;
            const response = await axiosInstance.get(url);
            const resultdata = response.data;
            const loadBooksList = resultdata.slice(offset, offset + 10);
            const count = resultdata.length;

            if (offset + 9 > count) {
                var nextURL = false;
            }
            else {
                nextURL = true;
            }

            if (page == 0) {
                var prevURL = false;
            }
            else {
                prevURL = true;
            }

            this.setState({ loading: false, booklist:resultdata,loadBooksList: loadBooksList, next: nextURL, prev: prevURL, totalBooks: count, page });
        } catch (e) {
            this.setState({ loading: false });
        }
    }

    async componentDidMount() {

    console.log(this.props);
        const page = this.props.match.params.page;
        await this.getBookList(page);
    }

    async componentWillReceiveProps(nextProps) {
        const pageNumber = nextProps.match.params.page;
        const oldPageNumber = this.props.match.params.page;

        if (pageNumber !== oldPageNumber) {
            await this.getBookList(pageNumber);
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        window.location = `/book_search/${this.state.value}`;
    }

    //Pop Up Modal
    openModal(text) {
        ModalManager.open(<MyModal text={text} onRequestClose={() => true} />);
    }


    render() {

        let body = null;
        let previousPageNumber = parseInt(this.state.page - 1);
        let nextPageNumber = parseInt(this.state.page) + 1;

        if (this.state.loading) {
            body = <div className="row">Loading...</div>;
        } else if (this.state.loadBooksList.length) {
                const booksView = this.state.loadBooksList.map(book=> {
                    return (
                        <div className=" card">
                            <div className="card-block">
                                <h4> <u className="card-title">{book.title}</u></h4>
                                Price : {book.price}$
                                                           <br />
                                Publisher : {book.publisher}
                                <br />
                                Amazon rank: {book.amazon_rank}
                                <br /><br />
                                <a
                                    className="btn btn-primary"
                                    onClick={() => this.openModal(book.primary_isbn)}>
                                    See ISBN
                                        </a>
                            </div>
                        </div>
                    );

                });
                body = <div className="scrolling-wrapper">
                    {booksView}
                </div>;
        }

        return (

            <div>

                <input className="search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
                <input type="submit" value="Search" onClick={this.handleSubmit} />


                 <div className="row">

                    <div className="body">
                         {body}
                    </div>
                     <div className="button">
                         <Link to={`/page/${previousPageNumber}`}><button className="btn btn-default" disabled={!this.state.prev}>Previous</button></Link>
                         <Link to={`/page/${nextPageNumber}`}><button className="btn btn-success" disabled={!this.state.next}>Next</button></Link>
                     </div>

                </div>
            </div>
        );


        
    }
}
export default BookList;