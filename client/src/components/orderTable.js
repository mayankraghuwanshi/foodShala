import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getOrdersActionForCustomer, getOrdersActionForOwner} from "../actions/orderAction";

const Orders =(props)=>{

    const {getOrdersActionForOwner ,getOrdersActionForCustomer, auth , order} = props;
    let count = 1;

    useEffect(()=>{
        async function fetch(){
            if(auth.user.role==='customer'){
                await getOrdersActionForCustomer(auth.user._id);
            }
            else {
                await getOrdersActionForOwner(auth.user._id);
            }
        }
        fetch();
    },[])
    return (
        <div className="container bg-light">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                { props.order ? props.order.orders.map((item,key)=>(
                    <tr>
                        <th scope="row">{count++}</th>
                        <td>{item.owner}</td>
                        <td>{item.customer}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.isDelivered ? "Done" : "Pending"}</td>
                        <td>{auth.user.role==='customer' ? <button className="btn btn-primary">Cancel</button> :<button className="btn btn-primary">Accept</button> }</td>
                    </tr>
                )) : ""}

                </tbody>
            </table>
        </div>
    )
}

const mstp=(state)=>({
    auth : state.auth,
    order : state.order
})

export default connect(mstp , {getOrdersActionForOwner,getOrdersActionForCustomer})(Orders)