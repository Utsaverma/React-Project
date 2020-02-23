import React from 'react';
import {Modal,Button,ButtonToolbar,Table} from 'react-bootstrap'
import axios from 'axios';
import Ability from './Ability'

function MyVerticallyCenteredModal(props) {
    const responseKeys=Object.keys(props.details)
    const renderData=(responseKey,type)=>{
        if(Array.isArray(type)){
            if(responseKey=="abilities"){
                return type.map((innerVal,index)=>{
                  return <li key={index}><Ability key={responseKey} data={innerVal.ability} val={responseKey}/></li>
                })
                //return "abilities"
            }
            else{
                return <li>is an array</li>
            }
            
        }
        else if(type.constructor === Object){
            return <li>is an object</li>
        }
        else{
            return <li>{type}</li>;
        }
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            console.log(props.details)
            
            }
            {
                responseKeys?responseKeys.map((val,index)=>{
                    return <div key={index}>
                        <ul>{val}
                        {renderData(val,props.details[val])}
                        </ul>
                    </div>
                }):null
            }
            {/* <Table striped bordered hover size="sm">
            <tbody>
            {
                
                responseKeys?responseKeys.map((val,index)=>{
                    return <tr key={index}>
                        <td>{val}</td>
                        <td>{props.details.val}</td>
                    </tr>
                }):null
            }
            </tbody>
            </Table> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
function ModalPopup(props) {
const [modalShow, setModalShow] = React.useState(false);
const [pokemonDetails,setPokemonDetails]=React.useState("");
const funCall=()=>{
    axios.get(props.pokemon.url)
    .then(response=>{
        setPokemonDetails(response.data);
    })
    .catch(error=>{
        console.log(error)
    })
}
const openPopUp=()=>{
    funCall();
    setModalShow(true)
}
return (
    <ButtonToolbar>
    <Button variant="primary" onClick={() => openPopUp()}>
    {props.pokemon.name}
    </Button>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={props.pokemon.name}
        details={pokemonDetails}
    />
    </ButtonToolbar>
);
}
  
export default ModalPopup;