import React from 'react';
import axios from 'axios';
import ModalPopup from './ModalPopup';
import Select from 'react-select'

class MainScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count:0,
            filterCount:0,
            next:"",
            previous:"",
            results:[],
            allResults:[],
        }
    }
    componentDidMount(){
        axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then(response=>{
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results,filterCount:response.data.count})
            this.getAllData(response.data.count)
        })
        .catch(error=>{
            console.log(error);
        })
       
    }
    componentDidUpdate(){
        // let next=this.state.next;
        // let pokemonList=[];
        // while(next){
        //     axios.get(next)
        //     .then(response=>{
        //         console.log(response.data)
        //         next=response.data.next;
        //     })
        //     .catch(error=>{
        //         return;
        //     })
            
        // }
    }
    getAllData=(count)=>{
        axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+count)
        .then(response=>{
            this.setState({allResults:response.data.results})
        })
        .catch(error=>{
            console.log(error)
        })
    }
    loadData=(loadUrl)=>{
        axios.get(loadUrl)
        .then(response=>{
            this.setState({count:response.data.count,next:response.data.next,previous:response.data.previous,results:response.data.results,filterCount:response.data.count})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    applyNameFilters=(nameList)=>{
        if(nameList.length==0){
            this.clearFilters();
        }
        else{
            let newNameList=[];
            nameList.map(name=>
                newNameList.push(name.value))
            //console.log("to be filtered",nameList)
            let filtVals=this.state.allResults.filter(function(v){ return newNameList.indexOf(v.name) >= 0;})
            //console.log(filtVals)
            this.setState({next:null,previous:null,filterCount:nameList.length,results:filtVals})
        }
    }
    clearFilters=()=>{
        this.loadData("https://pokeapi.co/api/v2/pokemon/");
    }
    render(){
        let pokemonList=[]
        if(this.state.allResults){
            this.state.allResults.map(pokemon=>{
            let obj={value:pokemon.name,label:pokemon.name.toUpperCase()}
            pokemonList.push(obj)
            })
        }
        return (
            <React.Fragment>
                <div>Welcome to Pokedox</div>
                <div className="resultContainer">
                    <div>Total Pokemons : {this.state.count}</div>
                    <div>Selected Pokemons: {this.state.filterCount}</div>
                    <div>Filters:
                        <Select
                            isMulti
                            name="name"
                            options={pokemonList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={val => this.applyNameFilters(val)}
                        />
                    </div>
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
