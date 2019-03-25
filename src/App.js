import React, { Component } from 'react';
import axios from 'axios';

import InitialScreen from './Pages/InitialScreen';
import QuizzScreen from './Pages/QuizzScreen';

class App extends Component {

    constructor(){
        super();
        this.state = {
            screenBeingShown: 0,
            currentPage: 1,
            characters: [],
            guessedCharacters: [],
            resources: {},
            resourcesBeingFetched: [],
            characterPictures: {}
        }
    }

    componentDidMount(){
        this.getCharacters(1);
    }

    getImage = (index, term) =>{
        let APIKey = "AIzaSyAC0MVVBcZqBYtKH8haZHd2ZFl2Kz4hg1A",
            CustomSearchID = "010694824975899644089:m6l68ukm8ma",
            base_url = "https://www.googleapis.com/customsearch/v1";

        axios.get(base_url,{
            params:{
                key: APIKey,
                cx: CustomSearchID,
                searchType: 'image',
                q: term
            }
        })
            .then((response)=>{
                this.setState({image: response.data.items[0].link});
            });
    }

    insertImageIntoCharacter = (index, imageLink) => {
        let {characters} = this.state;
        characters[index].image = imageLink;
        this.setState({characters});
    }

    getCharacters = (page) =>{
        axios.get('https://swapi.co/api/people/', {
            params:{
                page
            }
        })
        .then((characters)=>{
            this.setState({characters: characters.data.results})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    includeResource = (resourceURI, value) => {
        let resources = this.state.resources;
        resources[resourceURI] = value;
        this.setState({resources});
    }

    getResource = (resourceURI) => {
        if( this.state.resources[resourceURI] === undefined && 
            this.state.resourcesBeingFetched.indexOf(resourceURI)===-1)
            this.fetchResource(resourceURI);

        return this.state.resources[resourceURI];
    }

    fetchResource = (resourceURI) =>{
        this.setState({resourcesBeingFetched: [...this.state.resourcesBeingFetched, resourceURI]});

        axios.get(resourceURI)
            .then((resource)=>{
                this.includeResource(resourceURI, (resource.data.name || resource.data.title));
            })
            
    }

    onNextPage = () => {
        let currentPage = this.state.currentPage+1;
        this.getCharacters(currentPage);
        this.setState({currentPage});
    }

    onPreviousPage = () => {
        let currentPage = Math.max(this.state.currentPage+1, 0);
        this.getCharacters(currentPage);
        this.setState({currentPage});
    }

    openScreen = (num) => {
        this.setState({screenBeingShown: num});
    }

    render() {
        const {screenBeingShown} = this.state;

        return (
        <div className="App">
            {screenBeingShown===0&&
            <InitialScreen 
                onStart={()=>this.openScreen(1)}/>}
            {screenBeingShown===1&&
            <QuizzScreen 
                characters={this.state.characters}
                guessedCharacters={this.state.guessedCharacters}
                onNextPage={this.onNextPage}
                onPreviousPage={this.onPreviousPage}
                getResource={this.getResource}/>}
        </div>
        );
    }
}

export default App;
