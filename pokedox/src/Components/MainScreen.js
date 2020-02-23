import React from 'react';
import axios from 'axios';
import ModalPopup from './ModalPopup';

class MainScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count:0,
            next:"",
            previous:"",
            results:[]
        }
    }
    componentDidMount(){
        axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then(response=>{
            console.log(response.data)
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    loadData=(loadUrl)=>{
        axios.get(loadUrl)
        .then(response=>{
            console.log(response.data)
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    render(){
        return (
            <React.Fragment>
                <div>Welcome to Pokedox</div>
                <div className="resultContainer">
                    Total Pokemons : {this.state.count}
                    <ul className="pokemonList">
                        {this.state.results?this.state.results.map((pokemon,index)=>{
                            return <li key={index}><ModalPopup pokemon={pokemon} /></li>
                        })
                        :null}
                    </ul>
                    {this.state.previous?<button className="prev" onClick={e=>this.loadData(this.state.previous)}>Prev</button>:null}
                    {this.state.next?<button className="next" onClick={e=>this.loadData(this.state.next)}>Next</button>:null}
                </div>
            </React.Fragment>
        );
    }
  
}

export default MainScreen;
