import React from 'react';
import axios from 'axios';

class Ability extends React.Component {
    constructor(){
        super();
        this.state={
            name:"",
            url:"",
            data:[]
        }
    }
    componentDidMount(){
        let data=[];
        axios.get(this.props.data.url)
        .then(response=>{
            console.log(response.data);
            data=response.data;
            this.setState({url:this.props.data.url,name:data.name,data:data})
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    componentDidUpdate(){
        // console.log("updated")
        // axios.get(this.state.url)
        // .then(response=>{
        //     console.log(response.data);
        // })
        // .catch(error=>{
        //     console.log(error);
        // })
    }
    render(){
        let objKeys=Object.keys(this.state.data);
        console.log(objKeys)
        let results=this.state.data;
        return (
            objKeys.length?<div>
                {this.state.name}
                <div>
                    effect:{results.effect_entries.map((vals,index)=>{
                        return <ul key={index}>
                                <li>Effect:{vals.effect}</li>
                                <li>Short Effect:{vals.language.short_effect}</li>
                            </ul>
                    })
                    }
                </div>
                
            </div>:null

        );
    }
}
export default Ability;